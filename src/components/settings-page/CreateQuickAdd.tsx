import { useState } from "react";
import { Button, Fieldset, Input, Label } from "@aws-amplify/ui-react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { iconList } from "../../helpers/iconMap";
import { useCreateQuickAdd } from "../../hooks/useQuickAdd";
import { usePreferences } from "../../hooks/usePreferences";

export function CreateQuickAdd() {
  const { data: preferences } = usePreferences();
  const createQuickAdd = useCreateQuickAdd();
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [icon, setIcon] = useState<string>("Fastfood");

  const handleCreateQuickAdd = () => {
    if (!name || !calories || !icon) {
      alert("Fill out all fields");
      return;
    }

    createQuickAdd.mutate({
      name,
      calories: parseInt(calories),
      icon,
      protein: parseInt(protein) || 0,
    });

    setName("");
    setCalories("");
    setProtein("");
    setIcon("Fastfood");
  };

  return (
    <Fieldset legend="Create Quick Add" variation="outlined" direction="column">
      <Label htmlFor="name">Name:</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        size="large"
        placeholder="Lunch"
        id="name"
      />
      <Label htmlFor="calories">Calories:</Label>
      <Input
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        size="large"
        placeholder="250"
        id="calories"
      />
      {!preferences?.hideProtein && (
        <>
          <Label htmlFor="protein">Protein (g):</Label>
          <Input
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            size="large"
            placeholder="12"
            id="protein"
          />
        </>
      )}
      <Label htmlFor="icon">Icon:</Label>
      <Select
        onChange={(e: SelectChangeEvent) => setIcon(e.target.value)}
        label="Icon"
        value={icon}
        id="icon"
      >
        {iconList.map((args) => (
          <MenuItem key={args.iconName} value={args.iconName}>
            {args.component}
          </MenuItem>
        ))}
      </Select>
      <Button
        isFullWidth={true}
        isLoading={createQuickAdd.isPending}
        colorTheme="overlay"
        size="large"
        onClick={handleCreateQuickAdd}
      >
        Create Quick Add
      </Button>
    </Fieldset>
  );
}
