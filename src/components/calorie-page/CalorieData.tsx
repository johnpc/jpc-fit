import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Heading,
  Loader,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import {
  FoodEntity,
  GoalEntity,
  createFoodListener,
  createGoal,
  createGoalListener,
  deleteFood,
  deleteFoodListener,
  getGoal,
  listFood,
  unsubscribeListener,
} from "../../data/entities";
import AddCalorieFab from "./AddCalorieFab";
import { Delete, Edit } from "@mui/icons-material";
import { getHealthKitData } from "../../helpers/getHealthKitData";

export const CalorieData = () => {
  const [foods, setFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [activeCalories, setActiveCalories] = useState<number>();
  const [baseCalories, setBaseCalories] = useState<number>();

  const setup = async () => {
    const { activeCalories, baseCalories } = await getHealthKitData();
    setActiveCalories(activeCalories);
    setBaseCalories(baseCalories);
    setFoods(await listFood(new Date()));
    setGoal(await getGoal());
  };
  useEffect(() => {
    setup();
    const createFoodSubscription = createFoodListener(setup);
    const deleteFoodSubscription = deleteFoodListener(setup);
    const createGoalSubscription = createGoalListener(setup);
    App.addListener("appStateChange", ({ isActive }) => {
      console.log({ appStateChange: true, isActive });
      if (isActive) {
        setup();
      }
    });

    App.addListener("appUrlOpen", (data) => {
      console.log({ appUrlOpen: true, data });
      console.log("App opened with URL:", data);
    });

    App.addListener("appRestoredResult", (data) => {
      console.log({ appRestoredResult: true, data });
      console.log("Restored state:", data);
    });

    App.addListener("resume", () => {
      console.log({ resume: true });
    });

    App.addListener("pause", () => {
      console.log({ pause: true });
    });

    return () => {
      unsubscribeListener(createFoodSubscription);
      unsubscribeListener(deleteFoodSubscription);
      unsubscribeListener(createGoalSubscription);
      App.removeAllListeners();
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

  const consumedCalories = foods.reduce(
    (sum: number, food: FoodEntity) => sum + food.calories,
    0,
  );

  if (activeCalories === undefined || baseCalories === undefined)
    return <Loader />;
  const targetCalories = goal?.dietCalories ?? activeCalories + baseCalories;
  const remainingCalories = targetCalories - consumedCalories;
  return (
    <>
      <Card>
        <Heading>
          Remaining Calories:{" "}
          <span style={{ color: remainingCalories > 0 ? "green" : "red" }}>
            {remainingCalories}
          </span>{" "}
          for {new Date().toLocaleDateString()}
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
              <TableCell>{activeCalories}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Calories</TableCell>
              <TableCell>{baseCalories}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Goal</TableCell>
              <TableCell>{targetCalories}</TableCell>
              <TableCell onClick={() => handleEditGoal()}>
                <Edit />
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
                <TableCell as="th">Name</TableCell>
                <TableCell as="th">Calories</TableCell>
                <TableCell as="th">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>{food.createdAt.toLocaleTimeString()}</TableCell>
                  <TableCell>{food.name ?? "No name"}</TableCell>
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