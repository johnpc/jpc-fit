import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  FoodEntity,
  PreferencesEntity,
  QuickAddEntity,
  createFood,
} from "../../data/entities";
import { findIcon } from "../../helpers/iconMap";
import { customQuickAdd } from "../settings-page/QuickAddConfiguration";

export default function AddCalorieFab(props: {
  preferences?: PreferencesEntity;
  quickAdds: QuickAddEntity[];
  date: Date;
  onAdd: (food: FoodEntity) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAction = (quickAdd: QuickAddEntity) => {
    let calorieAmount = 0;
    let proteinAmount = quickAdd.protein ?? 0;
    if (quickAdd.id === customQuickAdd.id) {
      calorieAmount = parseInt(prompt("Enter calorie amount")!);
      if (Number.isNaN(calorieAmount) || calorieAmount < 1) {
        alert("Invalid integer");
        return;
      }

      if (props.preferences?.hideProtein) {
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

    handleClose();
    // Prioritize closing the FAB
    setTimeout(() => {
      props.onAdd({
        id: "optimisticAdd",
        createdAt: new Date(),
        name: quickAdd.name,
        calories: calorieAmount,
        protein: proteinAmount,
        day: props.date.toLocaleDateString(),
      });
    }, 250);

    setTimeout(async () => {
      await createFood(quickAdd.name, calorieAmount, proteinAmount, props.date);
    }, 500);
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
        sx={{
          position: "fixed",
          bottom: 60,
          right: 42,
          margin: 0,
          top: "auto",
          left: "auto",
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        transitionDuration={{
          // enter: 10000,
          exit: 10000,
          appear: 10000,
        }}
        TransitionProps={{
          enter: false,
          exit: false,
          appear: false,
        }}
        FabProps={{
          variant: "circular",
          size: "large",
          disabled: false,
          disableFocusRipple: true,
          disableRipple: true,
          disableTouchRipple: true,
        }}
      >
        {props.quickAdds.map((action) => (
          <SpeedDialAction
            FabProps={{
              variant: "extended",
              size: "small",
              disabled: false,
              disableFocusRipple: true,
              disableRipple: true,
              disableTouchRipple: true,
            }}
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
