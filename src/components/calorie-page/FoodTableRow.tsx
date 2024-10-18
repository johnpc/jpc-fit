import { Loader, TableCell, TableRow, useTheme } from "@aws-amplify/ui-react";
import { deleteFood, FoodEntity, PreferencesEntity } from "../../data/entities";
import { useState } from "react";

export const FoodTableRow = (props: {
  food: FoodEntity;
  preferences?: PreferencesEntity;
  setFoodDetail: (id: string) => void;
  onRemove: (food: FoodEntity) => void;
}) => {
  const { tokens } = useTheme();
  const [deleting, setDeleting] = useState(false);

  const food = props.food;

  const handleDeleteFood = async (food: FoodEntity) => {
    setDeleting(true);
    setTimeout(() => {
      props.onRemove(food);
    }, 100);
    setTimeout(async () => {
      await deleteFood(food);
    }, 250);
  };
  const createdAt =
    typeof food.createdAt === "string"
      ? new Date(food.createdAt)
      : food.createdAt;
  return (
    <TableRow key={food.id}>
      <TableCell>
        {createdAt.toLocaleTimeString().split(":").slice(0, 2).join(":")}
      </TableCell>
      <TableCell
        color={
          food.id === "optimisticAdd" ? undefined : tokens.colors.primary[60]
        }
        onClick={() => props.setFoodDetail(food.id)}
      >
        {food.name ?? "No name"}
      </TableCell>
      <TableCell>{food.calories}</TableCell>
      {props.preferences?.hideProtein ? null : (
        <TableCell>{food.protein ?? 0}g</TableCell>
      )}
      <TableCell onClick={() => handleDeleteFood(food)}>
        {deleting ? <Loader /> : "❌"}
      </TableCell>
    </TableRow>
  );
};
