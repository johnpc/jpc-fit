import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Heading,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import {
  FoodEntity,
  GoalEntity,
  WeightEntity,
  createFoodListener,
  createGoal,
  createGoalListener,
  createWeight,
  createWeightListener,
  deleteFood,
  deleteFoodListener,
  getGoal,
  getWeight,
  listFood,
  unsubscribeListener,
} from "../data/entities";
import AddCalorieFab from "./AddCalorieFab";
import { Delete, MonitorWeight, Edit } from "@mui/icons-material";

export const CalorieData = (props: {
  activeCalories: number;
  baseCalories: number;
  weight: number;
}) => {
  const [foods, setFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [weight, setWeight] = useState<WeightEntity>();

  useEffect(() => {
    const setup = async () => {
      setFoods(await listFood(new Date()));
      setGoal(await getGoal());
      setWeight(await getWeight());
    };
    setup();
    const createFoodSubscription = createFoodListener(setup);
    const deleteFoodSubscription = deleteFoodListener(setup);
    const createGoalSubscription = createGoalListener(setup);
    const createWeightSubscription = createWeightListener(setup);
    return () => {
      unsubscribeListener(createFoodSubscription);
      unsubscribeListener(deleteFoodSubscription);
      unsubscribeListener(createGoalSubscription);
      unsubscribeListener(createWeightSubscription);
    };
  }, []);

  const handleEditGoal = async () => {
    const newGoal = parseInt(prompt("Enter new goal")!);
    if (Number.isNaN(newGoal) || newGoal < 1) {
      alert("Invalid integer");
      return;
    }

    await createGoal(newGoal);
  };

  const handleEditWeight = async () => {
    const newWeight = parseInt(prompt("Enter your weight")!);
    if (Number.isNaN(newWeight) || newWeight < 1) {
      alert("Invalid integer");
      return;
    }

    await createWeight(newWeight);
  };
  const consumedCalories = foods.reduce(
    (sum: number, food: FoodEntity) => sum + food.calories,
    0,
  );
  const targetCalories =
    goal?.dietCalories ?? props.activeCalories + props.baseCalories;
  const remainingCalories = targetCalories - consumedCalories;
  return (
    <>
      <Card>
        <Heading>
          Remaining Calories:{" "}
          <span style={{ color: remainingCalories > 0 ? "green" : "red" }}>
            {remainingCalories}
          </span>
        </Heading>
      </Card>
      <Card>
        <Table caption="Healthkit data" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Data Type</TableCell>
              <TableCell as="th">Value</TableCell>
              <TableCell as="th">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Active Calories</TableCell>
              <TableCell>{props.activeCalories}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Calories</TableCell>
              <TableCell>{props.baseCalories}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Goal</TableCell>
              <TableCell>{targetCalories}</TableCell>
              <TableCell onClick={() => handleEditGoal()}>
                <Edit />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>{weight?.currentWeight ?? props.weight}</TableCell>
              <TableCell onClick={() => handleEditWeight()}>
                <MonitorWeight />
              </TableCell>
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
                  <TableCell onClick={() => deleteFood(food)}>
                    <Delete />
                  </TableCell>
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
