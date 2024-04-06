import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {
  QuickAddEntity,
  createFood,
  createQuickAddListener,
  deleteQuickAddListener,
  listQuickAdds,
  unsubscribeListener,
} from "../../data/entities";
import { findIcon } from "../../helpers/iconMap";
import {
  customQuickAdd,
  defaultQuickAdds,
} from "../settings-page/QuickAddConfiguration";

export default function AddCalorieFab() {
  const [open, setOpen] = React.useState(false);
  const [quickAdds, setQuickAdds] = React.useState<QuickAddEntity[]>([]);

  const setup = async () => {
    const quickAdds = await listQuickAdds();
    if (!quickAdds.length) {
      setQuickAdds(defaultQuickAdds);
    } else {
      setQuickAdds(quickAdds);
    }
  };
  React.useEffect(() => {
    setup();
    const createQuickAddSubscription = createQuickAddListener(setup);
    const deleteQuickAddSubscription = deleteQuickAddListener(setup);
    return () => {
      unsubscribeListener(createQuickAddSubscription);
      unsubscribeListener(deleteQuickAddSubscription);
    };
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAction = async (quickAdd: QuickAddEntity) => {
    let calorieAmount = 0;
    if (quickAdd.id === customQuickAdd.id) {
      calorieAmount = parseInt(prompt("Enter calorie amount")!);
      if (Number.isNaN(calorieAmount) || calorieAmount < 1) {
        alert("Invalid integer");
        return;
      }
    } else {
      calorieAmount = quickAdd.calories;
    }

    await createFood(quickAdd.name, calorieAmount);
    handleClose();
  };

  const css = `
    .MuiSpeedDialAction-staticTooltipLabel { width: 20pc; text-align: right; }
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
        {[...quickAdds, customQuickAdd].map((action) => (
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
