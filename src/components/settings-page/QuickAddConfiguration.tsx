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
  Text,
  useTheme,
} from "@aws-amplify/ui-react";
import { findIcon, iconList } from "../../helpers/iconMap";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import {
  PreferencesEntity,
  QuickAddEntity,
  createQuickAdd,
  deleteQuickAdd,
} from "../../data/entities";
import { Delete, HelpOutline } from "@mui/icons-material";

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
    name: "xx-small",
    calories: 100,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-100",
  },
  {
    icon: "SoupKitchen",
    name: "x-small",
    calories: 250,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-250",
  },
  {
    icon: "RamenDining",
    name: "small",
    calories: 500,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-500",
  },
  {
    icon: "KebabDining",
    name: "medium",
    calories: 750,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-750",
  },
  {
    icon: "LocalPizza",
    name: "large",
    calories: 1000,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-1000",
  },
  {
    icon: "Fastfood",
    name: "x-large",
    calories: 1500,
    protein: 0,
    createdAt: new Date(),
    id: "dqa-1500",
  },
  customQuickAdd,
];

export default function QuickAddConfiguration(props: {
  preferences?: PreferencesEntity;
  quickAdds: QuickAddEntity[];
}) {
  const { tokens } = useTheme();
  const [name, setName] = React.useState<string>();
  const [calories, setCalories] = React.useState<number>();
  const [protein, setProtein] = React.useState<number>();
  const [icon, setIcon] = React.useState<string>("Fastfood");
  const [isLoading, setIsLoading] = React.useState<boolean>();

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
      <Text
        variation="primary"
        as="span"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.normal}
        fontSize={tokens.fontSizes.medium}
        textDecoration="none"
        margin={tokens.space.small}
      >
        <HelpOutline fontSize={tokens.fontSizes.small.name as "small"} /> Why
        does jpc.fit default to t-shirt sizes when reporting calories consumed?
        <Text
          variation="primary"
          as="span"
          display={"block"}
          lineHeight={tokens.lineHeights.medium}
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.small}
          textDecoration="none"
          margin={tokens.space.small}
        >
          The philosophy of jpc.fit is that mindful eating is more important
          than counting every calorie exactly perfectly.
        </Text>
        <Text
          variation="primary"
          as="span"
          display={"block"}
          lineHeight={tokens.lineHeights.medium}
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.small}
          textDecoration="none"
          margin={tokens.space.small}
        >
          In the USA, it is legal for calorie labels be wrong by up to 20%. The
          painstaking math to calculate the calories of each ingredient is not
          worth the effort. Instead, we recommend loose estimation (and round up
          when it makes sense!)
        </Text>
        <Text
          variation="primary"
          as="span"
          display={"block"}
          lineHeight={tokens.lineHeights.medium}
          fontWeight={tokens.fontWeights.bold}
          fontSize={tokens.fontSizes.small}
          textDecoration="none"
          margin={tokens.space.small}
        >
          If this philosophy doesn't work for you, you can create custom quick
          adds for your most common meals to reduce the effort of entering
          calories consumed.
        </Text>
      </Text>
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
        {props.preferences?.hideProtein ? null : (
          <>
            <Label htmlFor="protein">Protein (g):</Label>
            <Input
              onChange={onChangeProtein}
              size="large"
              placeholder="12"
              id="calories"
            />
          </>
        )}
        <Label htmlFor="icon">Icon:</Label>
        <Select onChange={onSelectIcon} label="Icon" value={icon} id="icon">
          {iconList.map(
            (args: { iconName: string; component: React.ReactElement }) => (
              <MenuItem key={args.iconName} value={args.iconName}>
                {args.component}
              </MenuItem>
            ),
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
              <TableCell as="th">Cals</TableCell>
              {props.preferences?.hideProtein ? null : (
                <TableCell as="th">Pr</TableCell>
              )}
              <TableCell as="th">
                <Delete />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.quickAdds.map((quickAdd) => (
              <TableRow key={quickAdd.id}>
                <TableCell>{quickAdd.name}</TableCell>
                <TableCell>{findIcon(quickAdd.icon)}</TableCell>
                <TableCell>{quickAdd.calories}</TableCell>
                {props.preferences?.hideProtein ? null : (
                  <TableCell>{quickAdd.protein}</TableCell>
                )}
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
