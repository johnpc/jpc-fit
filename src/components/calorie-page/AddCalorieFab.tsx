import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useCreateFood } from "../../hooks/useFood";
import { QuickAddEntity, PreferencesEntity } from "../../lib/types";
import { findIcon } from "../../helpers/iconMap";

export function AddCalorieFab({
  quickAdds,
  date,
  preferences,
}: {
  quickAdds: QuickAddEntity[];
  date: Date;
  preferences?: PreferencesEntity;
}) {
  const [open, setOpen] = useState(false);
  const createFood = useCreateFood();

  const handleAction = (quickAdd: QuickAddEntity) => {
    let calories = quickAdd.calories;
    let protein = quickAdd.protein ?? 0;

    if (quickAdd.id === "dqa-Custom") {
      const calorieInput = prompt("Enter calorie amount");
      calories = parseInt(calorieInput || "");
      if (isNaN(calories) || calories < 1) {
        alert("Invalid integer");
        return;
      }

      if (preferences?.hideProtein) {
        protein = 0;
      } else {
        const proteinInput = prompt("Enter protein in grams");
        protein = parseInt(proteinInput || "0");
        if (isNaN(protein) || protein < 1) {
          protein = 0;
        }
      }
    }

    setOpen(false);
    createFood.mutate({
      name: quickAdd.name,
      calories,
      protein,
      day: date.toLocaleDateString(),
    });
  };

  const css = `
    .MuiSpeedDialAction-staticTooltipLabel { width: 15pc; text-align: right; }
  `;

  return (
    <>
      <style>{css}</style>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Add food"
        sx={{ position: "fixed", bottom: 60, right: 42 }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {quickAdds.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={findIcon(action.icon)}
            tooltipTitle={`${action.name}${action.calories ? ` (${action.calories} cals)` : ""}`}
            tooltipOpen
            onClick={() => handleAction(action)}
          />
        ))}
      </SpeedDial>
    </>
  );
}
