import { Tabs } from "@aws-amplify/ui-react";
import CaloriePage from "./CaloriePage";
import WeightPage from "./WeightPage";
import SettingsPage from "./SettingsPage";
import StatsPage from "./StatsPage";

export default function TabsView() {
  return (
    <>
      <Tabs
        justifyContent="flex-start"
        defaultValue="Calories"
        items={[
          { label: "Calories", value: "Calories", content: <CaloriePage /> },
          { label: "Weight", value: "Weight", content: <WeightPage /> },
          { label: "Stats", value: "Stats", content: <StatsPage /> },
          { label: "Settings", value: "Settings", content: <SettingsPage /> },
        ]}
      />
    </>
  );
}
