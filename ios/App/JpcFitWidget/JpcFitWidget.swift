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

func getHealthKitDataAggregate(completion: @escaping ((Double, Int) -> Void)) -> Void {
    
        let oneDayAgo = Calendar.current.startOfDay(for: Date())
        let activeEnergySampleType = HKQuantityType.quantityType(forIdentifier: HKQuantityTypeIdentifier.activeEnergyBurned)!
        let basalEnergySampleType = HKQuantityType.quantityType(forIdentifier: HKQuantityTypeIdentifier.basalEnergyBurned)!
        
        let predicate = HKQuery.predicateForSamples(withStart: oneDayAgo, end: .now, options: HKQueryOptions.strictStartDate)
        let query = HKSampleQuery(sampleType: activeEnergySampleType, predicate: predicate, limit: 0, sortDescriptors: nil) {
            _, results, _ in
            let outputs: [[String: Any]] = generateOutput(results: results)!
            //            print(outputs)
            var filtered = outputs.filter({ ($0["sourceBundleId"] as! String).contains("com.apple.health") })
            
            filtered = filtered.filter({ (($0["device"] as! [String: Any])["name"] as! String).contains("Apple Watch") })
            
            let numbers = filtered.map({ $0["value"] as! Double })
            let activeSum = numbers.reduce(0, { x, y in
                x + y
            })
            let query = HKSampleQuery(sampleType: basalEnergySampleType, predicate: predicate, limit: 0, sortDescriptors: nil) {
                _, results, _ in
                let outputs: [[String: Any]] = generateOutput(results: results)!
                var filtered = outputs.filter({ ($0["sourceBundleId"] as! String).contains("com.apple.health") })
                
                filtered = filtered.filter({ (($0["device"] as! [String: Any])["name"] as! String).contains("Apple Watch") })
                
                let numbers = filtered.map({ $0["value"] as! Double })
                let basalSum = numbers.reduce(0, { x, y in
                    x + y
                })
                if let userDefaults = UserDefaults(suiteName: "group.com.johncorser.fit.prefs") {
                    //                let userDefaults = UserDefaults.standard
                    print(userDefaults.dictionaryRepresentation().keys)
                    let consumedCalories = Int(userDefaults.string(forKey: "group.com.johncorser.fit.prefs.consumedCalories") ?? "0")
                    print(consumedCalories!)
                    completion(basalSum + activeSum, consumedCalories ?? 0) }
                else {
                    completion(basalSum + activeSum, 0)
                }
            }
            healthStore.execute(query)
        }
        healthStore.execute(query)
    }


struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), burnedCalories: 1736, consumedCalories: 1000 )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        func handler(burnedCalories: Double, consumedCalories: Int) -> Void {
            let entry = SimpleEntry(date: Date(), burnedCalories: Int(burnedCalories), consumedCalories: consumedCalories)
            completion(entry)
        }
        getHealthKitDataAggregate(completion: handler)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        func handler(burnedCalories: Double, consumedCalories: Int) -> Void {
            let entry = SimpleEntry(date: Date(), burnedCalories: Int(burnedCalories), consumedCalories: consumedCalories)
            completion(Timeline(entries: [entry], policy: .atEnd))
        }
        getHealthKitDataAggregate(completion: handler)
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
