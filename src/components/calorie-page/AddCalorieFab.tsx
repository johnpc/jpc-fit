import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
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
}) {
  const [open, setOpen] = React.useState(false);

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
      >
        {props.quickAdds.map((action) => (
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
