//
//  JpcFitWidget.swift
//  JpcFitWidget
//
//  Created by Corser, John on 5/29/24.
//

import WidgetKit
import SwiftUI
import HealthKit

var healthStore = HKHealthStore()
func addOrSubtractDay(day: Int) -> Date {
            Calendar.current.date(byAdding: .day, value: day, to: Date())!
}

func getDeviceInformation(device: HKDevice?) -> [String: String?]? {
        if (device == nil) {
            return nil;
        }

        let deviceInformation: [String: String?] = [
            "name": device?.name,
            "model": device?.model,
            "manufacturer": device?.manufacturer,
            "hardwareVersion": device?.hardwareVersion,
            "softwareVersion": device?.softwareVersion,
        ];

        return deviceInformation;
    }

func generateOutput(results: [HKSample]?) -> [[String: Any]]? {
    var output: [[String: Any]] = []
    let unit = HKUnit.kilocalorie()
    let unitName = "kilocalorie"
    for result in (results ?? []) {
        guard let sample = result as? HKQuantitySample else {
            return nil
        }
        let quantitySD = sample.startDate as NSDate
        let quantityED = sample.endDate as NSDate
        let quantityInterval = quantityED.timeIntervalSince(quantitySD as Date)
        let quantitySecondsInAnHour: Double = 3600
        let quantityHoursBetweenDates = quantityInterval / quantitySecondsInAnHour

        output.append([
            "uuid": sample.uuid.uuidString,
            "value": sample.quantity.doubleValue(for: unit),
            "unitName": unitName,
            "startDate": ISO8601DateFormatter().string(from: sample.startDate),
            "endDate": ISO8601DateFormatter().string(from: sample.endDate),
            "duration": quantityHoursBetweenDates,
            "source": sample.sourceRevision.source.name,
            "sourceBundleId": sample.sourceRevision.source.bundleIdentifier,
            "device": getDeviceInformation(device: sample.device) as Any,
        ])
    }

    return output
}

class HealthKitManager {
    static let shared = HealthKitManager()
    private let healthStore = HKHealthStore()

    private let calendar = Calendar.current
    private let dateFormatter: ISO8601DateFormatter = {
        let formatter = ISO8601DateFormatter()
        return formatter
    }()

    struct CalorieData {
        let burnedCalories: Double
        let consumedCalories: Int
    }

    private func fetchCalorieData(for type: HKQuantityType, from startDate: Date) async throws -> Double {
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: .now, options: .strictStartDate)
        let results = try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Double, Error>) in
            let query = HKSampleQuery(sampleType: type, predicate: predicate, limit: 0, sortDescriptors: nil) { _, results, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }
                let outputs = generateOutput(results: results) ?? []
                let filtered = outputs
                    .filter { ($0["sourceBundleId"] as! String).contains("com.apple.health") }
                    .filter { (($0["device"] as! [String: Any])["name"] as! String).contains("Apple Watch") }

                let sum = filtered
                    .map { $0["value"] as! Double }
                    .reduce(0, +)

                continuation.resume(returning: sum)
            }
            healthStore.execute(query)
        }
        return results
    }

    func getTotalCalories() async throws -> CalorieData {
        let startOfDay = calendar.startOfDay(for: Date())
        let activeType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!
        let basalType = HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned)!

        async let activeCalories = fetchCalorieData(for: activeType, from: startOfDay)
        async let basalCalories = fetchCalorieData(for: basalType, from: startOfDay)

        let totalCalories = try await activeCalories + basalCalories

        // Handle cached values
        let nonSharedDefaults = UserDefaults.standard
        if totalCalories == 0 {
            return CalorieData(
                burnedCalories: nonSharedDefaults.double(forKey: "cachedTotalCalories"),
                consumedCalories: 0
            )
        }

        nonSharedDefaults.setValue(totalCalories, forKey: "cachedTotalCalories")

        // Get consumed calories from shared defaults
        let consumedCalories = try await getConsumedCalories()

        return CalorieData(burnedCalories: totalCalories, consumedCalories: consumedCalories)
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
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), burnedCalories: 1736, consumedCalories: 1000)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        Task {
            do {
                let calorieData = try await HealthKitManager.shared.getTotalCalories()
                let entry = SimpleEntry(
                    date: Date(),
                    burnedCalories: Int(calorieData.burnedCalories),
                    consumedCalories: calorieData.consumedCalories
                )
                completion(entry)
            } catch {
                completion(placeholder(in: context))
            }
        }
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        Task {
            do {
                let calorieData = try await HealthKitManager.shared.getTotalCalories()
                let entry = SimpleEntry(
                    date: Date(),
                    burnedCalories: Int(calorieData.burnedCalories),
                    consumedCalories: calorieData.consumedCalories
                )
                let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
                completion(Timeline(entries: [entry], policy: .after(nextUpdate)))
            } catch {
                completion(Timeline(entries: [placeholder(in: context)], policy: .after(Date())))
            }
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let burnedCalories: Int
    let consumedCalories: Int
}

struct JpcFitWidgetEntryView : View {
    var entry: Provider.Entry
    var body: some View {
        let emoji = entry.burnedCalories - entry.consumedCalories > 0 ? "✅" : "❌"
        VStack {
            Spacer()
            Text((entry.burnedCalories).formatted() + " 🔥").dynamicTypeSize(.medium)

            Text("-" + (entry.consumedCalories).formatted() + " 🍕").dynamicTypeSize(.medium).padding(.bottom, .pi)
            Text("= " + (entry.burnedCalories - entry.consumedCalories).formatted() + " " + emoji).dynamicTypeSize(.xLarge)
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
    SimpleEntry(date: .now, burnedCalories: 1756, consumedCalories: 1000 )
}
