import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { createFood } from "../data/entities";
import {
  BakeryDining,
  Fastfood,
  LocalPizza,
  RamenDining,
} from "@mui/icons-material";

const actions = [
  { icon: <BakeryDining />, name: "100" },
  { icon: <RamenDining />, name: "200" },
  { icon: <LocalPizza />, name: "500" },
  { icon: <Fastfood />, name: "1000" },
];

export default function AddCalorieFab() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAction = async (actionName: string) => {
    const calorieAmount = parseInt(actionName);
    await createFood(calorieAmount);
    handleClose();
  };

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleAction(action.name)}
          />
        ))}
      </SpeedDial>
    </>
  );
}
