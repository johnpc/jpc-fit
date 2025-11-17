import { Tabs } from "@aws-amplify/ui-react";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CaloriePage from "./calorie-page";
import WeightPage from "./weight-page";
import StatsPage from "./stats-page";
import AphorismsPage from "./AphorismsPage";
import SettingsPage from "./settings-page";

export default function TabsView() {
  return (
    <Tabs
      justifyContent="flex-start"
      spacing="equal"
      defaultValue="Calories"
      items={[
        {
          label: <RestaurantIcon />,
          value: "Calories",
          content: <CaloriePage />,
        },
        {
          label: <MonitorWeightIcon />,
          value: "Weight",
          content: <WeightPage />,
        },
        {
          label: <QueryStatsIcon />,
          value: "Stats",
          content: <StatsPage />,
        },
        {
          label: <FormatQuoteIcon />,
          value: "Aphorisms",
          content: <AphorismsPage />,
        },
        {
          label: <ManageAccountsIcon />,
          value: "Settings",
          content: <SettingsPage />,
        },
      ]}
    />
  );
}
