//
//  JpcFitWidget.swift
//  JpcFitWidget
//
//  Created by Corser, John on 5/29/24.
//

import WidgetKit
import SwiftUI
import HealthKit

class HealthKitManager {
    static let shared = HealthKitManager()
    private let healthStore = HKHealthStore()
    private let calendar = Calendar.current
    private let dateFormatter = ISO8601DateFormatter()
    
    private init() {
        requestHealthKitPermissions()
    }
    
    private func requestHealthKitPermissions() {
        // Define the health data types we want to read
        guard let activeEnergyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned),
              let basalEnergyType = HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned) else {
            print("HealthKit: Health data types not available")
            return
        }
        
        // Request authorization
        healthStore.requestAuthorization(toShare: [], read: [activeEnergyType, basalEnergyType]) { success, error in
            if let error = error {
                print("HealthKit: Authorization request error: \(error.localizedDescription)")
                return
            }
            
            if success {
                print("HealthKit: Authorization request successful")
            } else {
                print("HealthKit: Authorization request denied")
            }
        }
    }

    struct CalorieData {
        let burnedCalories: Double
        let consumedCalories: Int
    }
    
    enum HealthKitError: Error {
        case dataFetchFailed
        case userDefaultsNotAvailable
        case authorizationDenied
        case noDataAvailable
        case filteringError
    }
    
    private func deviceInformation(from device: HKDevice?) -> [String: String?]? {
        guard let device = device else { return nil }
        
        return [
            "name": device.name,
            "model": device.model,
            "manufacturer": device.manufacturer,
            "hardwareVersion": device.hardwareVersion,
            "softwareVersion": device.softwareVersion,
        ]
    }
    
    private func processHealthSamples(_ results: [HKSample]?) -> [[String: Any]]? {
        guard let results = results else { return [] }
        
        var output: [[String: Any]] = []
        let unit = HKUnit.kilocalorie()
        let unitName = "kilocalorie"
        
        for result in results {
            guard let sample = result as? HKQuantitySample else {
                continue
            }
            
            let quantityInterval = sample.endDate.timeIntervalSince(sample.startDate)
            let quantityHoursBetweenDates = quantityInterval / 3600
            
            output.append([
                "uuid": sample.uuid.uuidString,
                "value": sample.quantity.doubleValue(for: unit),
                "unitName": unitName,
                "startDate": dateFormatter.string(from: sample.startDate),
                "endDate": dateFormatter.string(from: sample.endDate),
                "duration": quantityHoursBetweenDates,
                "source": sample.sourceRevision.source.name,
                "sourceBundleId": sample.sourceRevision.source.bundleIdentifier,
                "device": deviceInformation(from: sample.device) as Any,
            ])
        }
        
        return output
    }

    private func fetchCalorieData(for type: HKQuantityType, from startDate: Date) async throws -> Double {
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: .now, options: .strictStartDate)
        
        return try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Double, Error>) in
            let query = HKSampleQuery(sampleType: type, predicate: predicate, limit: 0, sortDescriptors: nil) { _, results, error in
                if let error = error {
                    print("HealthKit Query Error: \(error.localizedDescription)")
                    continuation.resume(throwing: error)
                    return
                }
                
                guard let outputs = self.processHealthSamples(results) else {
                    print("HealthKit: No samples processed")
                    continuation.resume(returning: 0)
                    return
                }
                
                print("HealthKit: Found \(outputs.count) samples")
                
                let filtered = outputs
                    .compactMap { entry -> Double? in
                        guard let sourceBundleId = entry["sourceBundleId"] as? String,
                              sourceBundleId.contains("com.apple.health"),
                              let device = entry["device"] as? [String: Any],
                              let deviceName = device["name"] as? String,
                              deviceName.contains("Apple Watch"),
                              let value = entry["value"] as? Double else {
                            return nil
                        }
                        return value
                    }
                
                print("HealthKit: After filtering, found \(filtered.count) valid samples")
                
                let sum = filtered.reduce(0, +)
                print("HealthKit: Total sum for \(type.identifier): \(sum)")
                continuation.resume(returning: sum)
            }
            healthStore.execute(query)
        }
    }

    func getTotalCalories() async throws -> CalorieData {
        let startOfDay = calendar.startOfDay(for: Date())
        
        guard let activeType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned),
              let basalType = HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned) else {
            print("HealthKit Error: Failed to create quantity types")
            throw HealthKitError.dataFetchFailed
        }
        
        // Check HealthKit authorization status
        let authStatus = healthStore.authorizationStatus(for: activeType)
        if authStatus != .sharingAuthorized {
            print("HealthKit Error: Not authorized to access HealthKit data. Status: \(authStatus)")
            throw HealthKitError.dataFetchFailed
        }

        do {
            async let activeCalories = fetchCalorieData(for: activeType, from: startOfDay)
            async let basalCalories = fetchCalorieData(for: basalType, from: startOfDay)

            let totalCalories = try await activeCalories + basalCalories
            
            print("HealthKit Data: Active: \(try await activeCalories), Basal: \(try await basalCalories), Total: \(totalCalories)")

            // Handle cached values
            let nonSharedDefaults = UserDefaults.standard
            if totalCalories == 0 {
                let cachedValue = nonSharedDefaults.double(forKey: "cachedTotalCalories")
                print("HealthKit: Using cached value: \(cachedValue)")
                return CalorieData(
                    burnedCalories: cachedValue,
                    consumedCalories: 0
                )
            }

            nonSharedDefaults.setValue(totalCalories, forKey: "cachedTotalCalories")
            print("HealthKit: Cached new value: \(totalCalories)")

            // Get consumed calories from shared defaults
            let consumedCalories = try await getConsumedCalories()

            return CalorieData(burnedCalories: totalCalories, consumedCalories: consumedCalories)
        } catch {
            print("HealthKit Error in getTotalCalories: \(error.localizedDescription)")
            throw error
        }
    }

    private func getConsumedCalories() async throws -> Int {
        guard let userDefaults = UserDefaults(suiteName: "group.com.johncorser.fit.prefs") else {
            return 0
        }

        let dateFormatter = DateFormatter()
        dateFormatter.dateStyle = .medium
        dateFormatter.timeStyle = .none
        let formattedDate = dateFormatter.string(from: Date())

        let consumedCalories = Int(userDefaults.string(forKey: "consumedCalories") ?? "0") ?? 0
        let consumedCaloriesDay = userDefaults.string(forKey: "consumedCaloriesDay") ?? ""

        return formattedDate != consumedCaloriesDay ? 0 : consumedCalories
    }
}

struct Provider: TimelineProvider {
    private let healthKitManager = HealthKitManager.shared
    private let userDefaults = UserDefaults.standard
    
    // Use zeros for placeholder to avoid showing fake data
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), burnedCalories: 0, consumedCalories: 0)
    }
    
    // Try to get cached values from UserDefaults if available
    private func getCachedEntry() -> SimpleEntry {
        let burnedCalories = Int(userDefaults.double(forKey: "cachedTotalCalories"))
        let consumedCalories = 0 // Default to 0 for consumed calories in widget
        return SimpleEntry(date: Date(), burnedCalories: burnedCalories, consumedCalories: consumedCalories)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        // For previews, use placeholder data
        if context.isPreview {
            completion(SimpleEntry(date: Date(), burnedCalories: 1756, consumedCalories: 1000))
            return
        }
        
        Task {
            do {
                let calorieData = try await healthKitManager.getTotalCalories()
                let entry = SimpleEntry(
                    date: Date(),
                    burnedCalories: Int(calorieData.burnedCalories),
                    consumedCalories: calorieData.consumedCalories
                )
                completion(entry)
            } catch let error as HealthKitManager.HealthKitError {
                // Use cached values instead of placeholder
                let cachedEntry = getCachedEntry()
                completion(cachedEntry)
                
                // Log the specific HealthKit error
                print("Widget HealthKit error: \(error)")
            } catch {
                // Use cached values for other errors too
                let cachedEntry = getCachedEntry()
                completion(cachedEntry)
                
                // Log the general error
                print("Widget general error: \(error.localizedDescription)")
            }
        }
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        Task {
            do {
                let calorieData = try await healthKitManager.getTotalCalories()
                let entry = SimpleEntry(
                    date: Date(),
                    burnedCalories: Int(calorieData.burnedCalories),
                    consumedCalories: calorieData.consumedCalories
                )
                let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date()
                completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
            } catch let error as HealthKitManager.HealthKitError {
                // Use cached values instead of placeholder
                let cachedEntry = getCachedEntry()
                
                // Schedule a quicker refresh when using cached data
                let nextUpdate = Calendar.current.date(byAdding: .minute, value: 5, to: Date()) ?? Date()
                completion(Timeline(entries: [cachedEntry], policy: .after(nextUpdate)))
                
                // Log the specific HealthKit error
                print("Widget timeline HealthKit error: \(error)")
            } catch {
                // Use cached values for other errors too
                let cachedEntry = getCachedEntry()
                
                // Schedule a quicker refresh when using cached data
                let nextUpdate = Calendar.current.date(byAdding: .minute, value: 5, to: Date()) ?? Date()
                completion(Timeline(entries: [cachedEntry], policy: .after(nextUpdate)))
                
                // Log the general error
                print("Widget timeline general error: \(error.localizedDescription)")
            }
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let burnedCalories: Int
    let consumedCalories: Int
}

struct JpcFitWidgetEntryView: View {
    var entry: Provider.Entry
    
    var body: some View {
        // Only show emoji if we have real data
        let hasRealData = entry.burnedCalories > 0
        let emoji = hasRealData ? (entry.burnedCalories - entry.consumedCalories > 0 ? "✅" : "❌") : ""
        
        VStack {
            Spacer()
            if hasRealData {
                Text("\(entry.burnedCalories.formatted()) 🔥").dynamicTypeSize(.medium)
                Text("-\(entry.consumedCalories.formatted()) 🍕").dynamicTypeSize(.medium).padding(.bottom, .pi)
                Text("= \((entry.burnedCalories - entry.consumedCalories).formatted()) \(emoji)").dynamicTypeSize(.xLarge)
            } else {
                Text("Loading data...").dynamicTypeSize(.medium)
                Text("Check Apple Health").dynamicTypeSize(.small)
                    .foregroundColor(.secondary)
                    .padding(.top, 4)
            }
            Spacer()
        }
    }
}

struct JpcFitWidget: Widget {
    let kind: String = "JpcFitWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            if #available(iOS 17.0, *) {
                JpcFitWidgetEntryView(entry: entry)
                    .containerBackground(.fill.tertiary, for: .widget)
            } else {
                JpcFitWidgetEntryView(entry: entry)
                    .padding()
                    .background()
            }
        }
        .configurationDisplayName("jpc.fit")
        .description("See a snapshot of your calories in/out.")
        .supportedFamilies([.systemSmall])
    }
}

#Preview(as: .systemSmall) {
    JpcFitWidget()
} timeline: {
    // Only use placeholder values in the preview
    SimpleEntry(date: .now, burnedCalories: 1756, consumedCalories: 1000)
}
