import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  PreferencesEntity,
  QuickAddEntity,
  createFood,
  createPreferencesListener,
  createQuickAddListener,
  deleteQuickAddListener,
  getPreferences,
  listQuickAdds,
  unsubscribeListener,
  updatePreferencesListener,
} from "../../data/entities";
import { findIcon } from "../../helpers/iconMap";
import {
  customQuickAdd,
  defaultQuickAdds,
} from "../settings-page/QuickAddConfiguration";

export default function AddCalorieFab(props: {date: Date}) {
  const [open, setOpen] = React.useState(false);
  const [quickAdds, setQuickAdds] = React.useState<QuickAddEntity[]>([]);
  const [preferences, setPreferences] = React.useState<PreferencesEntity>();

  const setup = async () => {
    const quickAdds = await listQuickAdds();
    if (!quickAdds.length) {
      setQuickAdds(defaultQuickAdds);
    } else {
      setQuickAdds([...quickAdds, customQuickAdd]);
    }
    setPreferences(await getPreferences());
  };
  React.useEffect(() => {
    setup();
    const createQuickAddSubscription = createQuickAddListener(setup);
    const deleteQuickAddSubscription = deleteQuickAddListener(setup);
    const createPreferencesSubscription = createPreferencesListener(setup);
    const updatePreferencesSubscription = updatePreferencesListener(setup);
    return () => {
      unsubscribeListener(createQuickAddSubscription);
      unsubscribeListener(deleteQuickAddSubscription);
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
    };
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAction = async (quickAdd: QuickAddEntity) => {
    let calorieAmount = 0;
    let proteinAmount = quickAdd.protein ?? 0;
    if (quickAdd.id === customQuickAdd.id) {
      calorieAmount = parseInt(prompt("Enter calorie amount")!);
      if (Number.isNaN(calorieAmount) || calorieAmount < 1) {
        alert("Invalid integer");
        return;
      }

      if (preferences?.hideProtein) {
        proteinAmount = 0;
      } else {
        proteinAmount = parseInt(prompt("Enter protein in grams")!);
        if (Number.isNaN(proteinAmount) || proteinAmount < 1) {
          proteinAmount = 0;
        }
      }
    } else {
      calorieAmount = quickAdd.calories;
    }

    await createFood(quickAdd.name, calorieAmount, proteinAmount, props.date);
    handleClose();
  };

  const css = `
    .MuiSpeedDialAction-staticTooltipLabel { width: 15pc; text-align: right; }
  `;
  return (
    <>
      <style>{css}</style>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {quickAdds.map((action) => (
          <SpeedDialAction
            key={action.name}
            style={{ textAlign: "right", width: "100%" }}
            icon={findIcon(action.icon)}
            tooltipTitle={`${action.name}${action.calories ? " (" + action.calories + " cals)" : ""}`}
            tooltipOpen
            onClick={() => handleAction(action)}
          />
        ))}
      </SpeedDial>
    </>
  );
}
