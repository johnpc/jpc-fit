import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Heading,
} from "@aws-amplify/ui-react";
import {useEffect, useState} from "react";
import {
  FoodEntity,
  createFoodListener,
  deleteFood,
  deleteFoodListener,
  listFood,
  unsubscribeListener,
} from "../data/entities";
import AddCalorieFab from "./AddCalorieFab";
import { Delete } from '@mui/icons-material';

export const CalorieData = (props: {
  activeCalories: number;
  baseCalories: number;
  weight: number;
}) => {
  const [foods, setFoods] = useState<FoodEntity[]>([]);
  useEffect(() => {
    const setup = async () => {
      setFoods(await listFood(new Date()));
    };
    setup();
    const createListener = createFoodListener(setup);
    const deleteListener = deleteFoodListener(setup);
    return () => {
      unsubscribeListener(createListener);
      unsubscribeListener(deleteListener);
    };
  }, []);
  const remainingCalories = (props.activeCalories + props.baseCalories) - foods.reduce((sum: number, food: FoodEntity) => sum + food.calories, 0);
  return (
    <>
      <Card>
        <Heading>Remaining Calories: <span style={{color: remainingCalories > 0 ? 'green' : 'red'}}>{remainingCalories}</span></Heading>
      </Card>
      <Card>
        <Table caption="Healthkit data" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Data Type</TableCell>
              <TableCell as="th">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Active Calories</TableCell>
              <TableCell>{props.activeCalories}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Calories</TableCell>
              <TableCell>{props.baseCalories}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>{props.weight}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      {foods.length > 0 ? (
        <Card>
          <Table caption="Consumption data" highlightOnHover={false}>
            <TableHead>
              <TableRow>
                <TableCell as="th">Time</TableCell>
                <TableCell as="th">Calories</TableCell>
                <TableCell as="th">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food) => (
                <TableRow>
                  <TableCell>{food.createdAt.toLocaleTimeString()}</TableCell>
                  <TableCell>{food.calories}</TableCell>
                  <TableCell onClick={() => deleteFood(food)}><Delete /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : null}
      <AddCalorieFab />
    </>
  );
};
