import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Heading,
  Loader,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { App } from "@capacitor/app";
import {
  FoodEntity,
  GoalEntity,
  PreferencesEntity,
  createFoodListener,
  createGoal,
  createGoalListener,
  createPreferencesListener,
  deleteFood,
  deleteFoodListener,
  deleteGoal,
  deleteGoalListener,
  getGoal,
  getPreferences,
  listFood,
  unsubscribeListener,
  updatePreferencesListener,
} from "../../data/entities";
import AddCalorieFab from "./AddCalorieFab";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  Edit,
} from "@mui/icons-material";
import { getHealthKitData } from "../../helpers/getHealthKitData";
import { addDays, subDays } from "date-fns";

export const CalorieData = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [foods, setFoods] = useState<FoodEntity[]>([]);
  const [goal, setGoal] = useState<GoalEntity>();
  const [activeCalories, setActiveCalories] = useState<number>();
  const [baseCalories, setBaseCalories] = useState<number>();
  const [steps, setSteps] = useState<number>();
  const [preferences, setPreferences] = useState<PreferencesEntity>();

  const setup = async () => {
    const { activeCalories, baseCalories, steps } =
      await getHealthKitData(date);
    setActiveCalories(activeCalories);
    setBaseCalories(baseCalories);
    setFoods(await listFood(date));
    setGoal(await getGoal());
    setSteps(steps);
    setPreferences(await getPreferences());
  };
  useEffect(() => {
    setup();
    const createFoodSubscription = createFoodListener(setup);
    const deleteFoodSubscription = deleteFoodListener(setup);
    const createGoalSubscription = createGoalListener(setup);
    const deleteGoalSubscription = deleteGoalListener(setup);
    const createPreferencesSubscription = createPreferencesListener(setup);
    const updatePreferencesSubscription = updatePreferencesListener(setup);
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
      unsubscribeListener(deleteGoalSubscription);
      unsubscribeListener(createPreferencesSubscription);
      unsubscribeListener(updatePreferencesSubscription);
      App.removeAllListeners();
    };
  }, [date]);

  const handleEditGoal = async () => {
    const newGoal = parseInt(prompt("Enter new goal")!);
    if (Number.isNaN(newGoal) || newGoal < 1) {
      alert("Invalid integer");
      return;
    }

    await createGoal(newGoal);
  };

  const handleDeleteGoal = async () => {
    await deleteGoal();
  };

  const handleSubtractDate = async () => {
    const day = subDays(date, 1);
    setDate(day);
  };
  const handleAddDate = async () => {
    const day = addDays(date, 1);
    setDate(day);
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
      <>
        <Text as="div" textAlign={"center"}>
          <ArrowBackIos
            style={{ paddingTop: "10px" }}
            onClick={handleSubtractDate}
          />
          <Text as="span" fontWeight={"bold"} margin={"15%"}>
            {date.toLocaleDateString()}
          </Text>
          <ArrowForwardIos
            style={{ paddingTop: "10px" }}
            onClick={handleAddDate}
          />
          {date.toLocaleDateString() ===
          new Date().toLocaleDateString() ? null : (
            <Button onClick={() => setDate(new Date())}>today</Button>
          )}
        </Text>
      </>
      <Card>
        <Heading>
          Remaining Calories:{" "}
          <span style={{ color: remainingCalories > 0 ? "green" : "red" }}>
            {remainingCalories}
          </span>{" "}
          for {date.toLocaleDateString()}
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
            {!steps ? null : (
              <TableRow>
                <TableCell>Steps</TableCell>
                <TableCell>{steps}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Active Calories</TableCell>
              <TableCell>{activeCalories} cals</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Calories</TableCell>
              <TableCell>{baseCalories} cals</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Goal</TableCell>
              <TableCell>{targetCalories} cals</TableCell>
              {goal?.dietCalories ? (
                <TableCell onClick={() => handleDeleteGoal()}>
                  <Delete />
                </TableCell>
              ) : (
                <TableCell onClick={() => handleEditGoal()}>
                  <Edit />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Consumed</TableCell>
              <TableCell>
                {foods.reduce((sum, food) => sum + (food.calories ?? 0), 0)}{" "}
                cals
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {preferences?.hideProtein ? null : (
              <TableRow>
                <TableCell>Protein</TableCell>
                <TableCell>
                  {foods.reduce((sum, food) => sum + (food.protein ?? 0), 0)}g
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
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
                <TableCell as="th">Cals</TableCell>
                {preferences?.hideProtein ? null : (
                  <TableCell as="th">Pr</TableCell>
                )}
                <TableCell as="th">
                  <Delete />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food) => (
                <TableRow key={food.id}>
                  <TableCell>
                    {food.createdAt
                      .toLocaleTimeString()
                      .split(":")
                      .slice(0, 2)
                      .join(":")}
                  </TableCell>
                  <TableCell>{food.name ?? "No name"}</TableCell>
                  <TableCell>{food.calories}</TableCell>
                  {preferences?.hideProtein ? null : (
                    <TableCell>{food.protein ?? 0}g</TableCell>
                  )}
                  <TableCell onClick={() => deleteFood(food)}>❌</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : null}
      <AddCalorieFab date={date} />
    </>
  );
};
