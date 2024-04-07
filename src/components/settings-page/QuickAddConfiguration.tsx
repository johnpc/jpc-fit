import * as React from "react";
import {
  Button,
  Card,
  Divider,
  Fieldset,
  Input,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Label,
} from "@aws-amplify/ui-react";
import {findIcon, iconList} from "../../helpers/iconMap";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {
  QuickAddEntity,
  createQuickAdd,
  createQuickAddListener,
  deleteQuickAdd,
  deleteQuickAddListener,
  listQuickAdds,
  unsubscribeListener,
} from "../../data/entities";
import {Delete} from "@mui/icons-material";

export const customQuickAdd: QuickAddEntity = {
  icon: "Restaurant",
  name: "Custom",
  calories: 0,
  protein: 0,
  createdAt: new Date(),
  id: "dqa-Custom",
};
export const defaultQuickAdds: QuickAddEntity[] = [
  {
    icon: "BakeryDining",
    name: "Tiny",
    calories: 100,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-100",
  },
  {
    icon: "RamenDining",
    name: "Small",
    calories: 200,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-200",
  },
  {
    icon: "LocalPizza",
    name: "Medium",
    calories: 500,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-500",
  },
  {
    icon: "Fastfood",
    name: "Large",
    calories: 1000,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-1000",
  },
  customQuickAdd,
];

export default function QuickAddConfiguration() {
  const [quickAdds, setQuickAdds] = React.useState<QuickAddEntity[]>([]);
  const [name, setName] = React.useState<string>();
  const [calories, setCalories] = React.useState<number>();
  const [protein, setProtein] = React.useState<number>();
  const [icon, setIcon] = React.useState<string>("Fastfood");
  const [isLoading, setIsLoading] = React.useState<boolean>();

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

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangeCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cals = parseInt(event.target.value);
    setCalories(cals);
  };

  const onChangeProtein = (event: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseInt(event.target.value);
    setProtein(p);
  };

  const onSelectIcon = (event: SelectChangeEvent) => {
    setIcon(event.target.value);
  };

  const handleCreateQuickAdd = async () => {
    if (!name || !calories || !icon) {
      alert("Fill out all fields");
      return;
    }

    setIsLoading(true);
    await createQuickAdd(name, calories, icon, protein);
    setIsLoading(false);
  };

  const handleDeleteQuickAdd = async (quickAdd: QuickAddEntity) => {
    await deleteQuickAdd(quickAdd);
  };
  return (
    <>
      <Fieldset
        legend="Create Quick Add"
        variation="outlined"
        direction="column"
      >
        <Label htmlFor="name">Name:</Label>
        <Input
          onChange={onChangeName}
          size="large"
          placeholder="Lunch"
          id="name"
        />
        <Label htmlFor="calories">Calories:</Label>
        <Input
          onChange={onChangeCalories}
          size="large"
          placeholder="250"
          id="calories"
        />
        <Label htmlFor="protein">Protein (g):</Label>
        <Input
          onChange={onChangeProtein}
          size="large"
          placeholder="12"
          id="calories"
        />
        <Label htmlFor="icon">Icon:</Label>
        <Select onChange={onSelectIcon} label="Icon" value={icon} id="icon">
          {iconList.map(
            (args: {iconName: string; component: React.ReactElement}) => (
              <MenuItem key={args.iconName} value={args.iconName}>
                {args.component}
              </MenuItem>
            )
          )}
        </Select>
        <Button
          isFullWidth={true}
          isLoading={isLoading}
          colorTheme="overlay"
          size="large"
          onClick={() => handleCreateQuickAdd()}
        >
          Create Quick Add
        </Button>
      </Fieldset>
      <Divider />
      <Card>
        <Table caption="Your quick adds" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Name</TableCell>
              <TableCell as="th">Icon</TableCell>
              <TableCell as="th">Calories</TableCell>
              <TableCell as="th">Protein</TableCell>
              <TableCell as="th">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quickAdds.map((quickAdd) => (
              <TableRow key={quickAdd.id}>
                <TableCell>{quickAdd.name}</TableCell>
                <TableCell>{findIcon(quickAdd.icon)}</TableCell>
                <TableCell>{quickAdd.calories}</TableCell>
                <TableCell>{quickAdd.protein}</TableCell>
                <TableCell onClick={() => handleDeleteQuickAdd(quickAdd)}>
                  {quickAdd.id.startsWith("dqa-") ? null : <Delete />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}
