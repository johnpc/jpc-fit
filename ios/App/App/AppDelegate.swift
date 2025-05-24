import UIKit
import Capacitor
import WidgetKit
import HealthKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    private let healthStore = HKHealthStore()

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Request HealthKit permissions at app launch
        requestHealthKitPermissions()
        return true
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
                // Update widget when permissions are granted
                WidgetCenter.shared.reloadAllTimelines()
            } else {
                print("HealthKit: Authorization request denied")
            }
        }
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
        
        // Refresh widget when app goes to background
        WidgetCenter.shared.reloadAllTimelines()
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
        
        // Refresh widget when app becomes active
        WidgetCenter.shared.reloadAllTimelines()
        
        // Check if we need to request HealthKit permissions again
        checkAndUpdateHealthKitData()
    }
    
    private func checkAndUpdateHealthKitData() {
        guard let activeEnergyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned) else {
            return
        }
        
        let authStatus = healthStore.authorizationStatus(for: activeEnergyType)
        if authStatus == .sharingAuthorized {
            // We have permission, update the widget with current data
            fetchAndCacheHealthKitData()
        } else if authStatus == .notDetermined {
            // Request permissions if not determined yet
            requestHealthKitPermissions()
        }
    }
    
    private func fetchAndCacheHealthKitData() {
        guard let activeEnergyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned),
              let basalEnergyType = HKQuantityType.quantityType(forIdentifier: .basalEnergyBurned) else {
            return
        }
        
        let calendar = Calendar.current
        let startOfDay = calendar.startOfDay(for: Date())
        let now = Date()
        
        let predicate = HKQuery.predicateForSamples(withStart: startOfDay, end: now, options: .strictStartDate)
        
        // Query for active energy
        let activeQuery = HKStatisticsQuery(quantityType: activeEnergyType, 
                                           quantitySamplePredicate: predicate,
                                           options: .cumulativeSum) { _, result, error in
            if let error = error {
                print("HealthKit active energy query error: \(error.localizedDescription)")
                return
            }
            
            guard let result = result, let sum = result.sumQuantity() else {
                return
            }
            
            let activeCalories = sum.doubleValue(for: HKUnit.kilocalorie())
            
            // Query for basal energy
            let basalQuery = HKStatisticsQuery(quantityType: basalEnergyType, 
                                              quantitySamplePredicate: predicate,
                                              options: .cumulativeSum) { _, result, error in
                if let error = error {
                    print("HealthKit basal energy query error: \(error.localizedDescription)")
                    return
                }
                
                guard let result = result, let sum = result.sumQuantity() else {
                    return
                }
                
                let basalCalories = sum.doubleValue(for: HKUnit.kilocalorie())
                
                // Save the total calories to shared UserDefaults
                let totalCalories = activeCalories + basalCalories
                if let sharedDefaults = UserDefaults(suiteName: "group.com.johncorser.fit.prefs") {
                    sharedDefaults.set(totalCalories, forKey: "burnedCalories")
                    sharedDefaults.set(Date(), forKey: "burnedCaloriesDate")
                    sharedDefaults.set(totalCalories, forKey: "cachedTotalCalories") // For backward compatibility
                    
                    print("Updated shared UserDefaults with burned calories: \(totalCalories)")
                    
                    // Refresh the widget with the new data
                    WidgetCenter.shared.reloadAllTimelines()
                }
            }
            
            self.healthStore.execute(basalQuery)
        }
        
        healthStore.execute(activeQuery)
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Handle widget URL scheme for refreshing
        if url.scheme == "jpcfit" && url.host == "refreshWidget" {
            checkAndUpdateHealthKitData()
            WidgetCenter.shared.reloadAllTimelines()
            return true
        }
        
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}
