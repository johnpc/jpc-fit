#import <Capacitor/Capacitor.h>

CAP_PLUGIN(HealthKitStatsPlugin, "HealthKitStats",
    CAP_PLUGIN_METHOD(getDayStats, CAPPluginReturnPromise);
)
