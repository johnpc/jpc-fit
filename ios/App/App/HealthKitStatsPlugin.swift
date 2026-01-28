import Foundation
import Capacitor
import HealthKit

@objc(HealthKitStatsPlugin)
public class HealthKitStatsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "HealthKitStatsPlugin"
    public let jsName = "HealthKitStats"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getDayStats", returnType: CAPPluginReturnPromise)
    ]
    
    private let healthStore = HKHealthStore()
    
    @objc func getDayStats(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.reject("HealthKit not available")
            return
        }
        
        guard let dateString = call.getString("date") else {
            call.reject("date is required")
            return
        }
        
        let formatter = ISO8601DateFormatter()
        guard let date = formatter.date(from: dateString) else {
            call.reject("Invalid date format")
            return
        }
        
        let calendar = Calendar.current
        let startOfDay = calendar.startOfDay(for: date)
        let endOfDay = calendar.date(byAdding: .day, value: 1, to: startOfDay)!
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: endOfDay, options: .strictStartDate)
        
        let group = DispatchGroup()
        var results: [String: Double] = [:]
        
        let types: [(String, HKQuantityTypeIdentifier, HKUnit)] = [
            ("activeCalories", .activeEnergyBurned, .kilocalorie()),
            ("baseCalories", .basalEnergyBurned, .kilocalorie()),
            ("steps", .stepCount, .count())
        ]
        
        for (key, identifier, unit) in types {
            guard let quantityType = HKQuantityType.quantityType(forIdentifier: identifier) else { continue }
            
            group.enter()
            let query = HKStatisticsQuery(quantityType: quantityType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, statistics, error in
                if let sum = statistics?.sumQuantity() {
                    results[key] = sum.doubleValue(for: unit)
                } else {
                    results[key] = 0
                }
                group.leave()
            }
            healthStore.execute(query)
        }
        
        group.notify(queue: .main) {
            call.resolve([
                "activeCalories": Int(results["activeCalories"] ?? 0),
                "baseCalories": Int(results["baseCalories"] ?? 0),
                "steps": Int(results["steps"] ?? 0)
            ])
        }
    }
}
