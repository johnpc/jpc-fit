import { Capacitor } from "@capacitor/core";
import { WidgetsBridgePlugin } from "capacitor-widgetsbridge-plugin";

const WIDGET_PREFERENCES_GROUP = "group.com.johncorser.fit.prefs";
const CONSUMED_CALORIES_KEY = "consumedCalories";
const CONSUMED_CALORIES_DAY_KEY = "consumedCaloriesDay";
const BURNED_CALORIES_KEY = "burnedCalories";

export const updateWidget = async (
  consumedCalories: number,
  burnedCalories?: number,
) => {
  if (Capacitor.getPlatform() !== "ios") return;

  try {
    const setItems = [
      WidgetsBridgePlugin.setItem({
        group: WIDGET_PREFERENCES_GROUP,
        key: CONSUMED_CALORIES_KEY,
        value: consumedCalories.toString(),
      }),
      WidgetsBridgePlugin.setItem({
        group: WIDGET_PREFERENCES_GROUP,
        key: CONSUMED_CALORIES_DAY_KEY,
        value: new Date().toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }),
    ];

    if (burnedCalories !== undefined && burnedCalories > 0) {
      setItems.push(
        WidgetsBridgePlugin.setItem({
          group: WIDGET_PREFERENCES_GROUP,
          key: BURNED_CALORIES_KEY,
          value: burnedCalories.toString(),
        }),
      );
    }

    await Promise.all(setItems);
    await WidgetsBridgePlugin.reloadAllTimelines();
  } catch (error) {
    console.error("Failed to update widget:", error);
  }
};
