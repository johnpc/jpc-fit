import { Card, Table, TableHead, TableRow, TableCell, TableBody, Loader } from "@aws-amplify/ui-react";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { useDeleteFood } from "../../hooks/useFood";
import { FoodEntity, PreferencesEntity } from "../../lib/types";

export function FoodTable({ foods, preferences }: { foods: FoodEntity[]; preferences?: PreferencesEntity }) {
  return (
    <Card>
      <Table caption="Consumption data" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Time</TableCell>
            <TableCell as="th">Name</TableCell>
            <TableCell as="th">Cals</TableCell>
            {!preferences?.hideProtein && <TableCell as="th">Protein</TableCell>}
            <TableCell as="th"><Delete /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map((food) => (
            <FoodRow key={food.id} food={food} preferences={preferences} />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function FoodRow({ food, preferences }: { food: FoodEntity; preferences?: PreferencesEntity }) {
  const [deleting, setDeleting] = useState(false);
  const deleteFood = useDeleteFood();

  const handleDelete = () => {
    setDeleting(true);
    deleteFood.mutate(food.id);
  };

  const createdAt = new Date(food.createdAt);

  return (
    <TableRow>
      <TableCell>
        {createdAt.toLocaleTimeString().split(":").slice(0, 2).join(":")}
      </TableCell>
      <TableCell>{food.name ?? "No name"}</TableCell>
      <TableCell>{food.calories}</TableCell>
      {!preferences?.hideProtein && <TableCell>{food.protein ?? 0}g</TableCell>}
      <TableCell onClick={handleDelete} style={{ cursor: "pointer" }}>
        {deleting ? <Loader /> : "❌"}
      </TableCell>
    </TableRow>
  );
}
