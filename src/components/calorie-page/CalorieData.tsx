import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Heading,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  Edit,
} from "@mui/icons-material";
import { addDays, subDays } from "date-fns";
import { useFood } from "../../hooks/useFood";
import { useGoal, useUpdateGoal } from "../../hooks/useGoal";
import { useQuickAdd } from "../../hooks/useQuickAdd";
import { usePreferences } from "../../hooks/usePreferences";
import { useHealthKitCache } from "../../hooks/useHealthKitCache";
import { useFetchHealthKitData } from "../../hooks/useFetchHealthKitData";
import { AddCalorieFab } from "./AddCalorieFab";
import { FoodTable } from "./FoodTable";
import { defaultQuickAdds, customQuickAdd } from "./defaultQuickAdds";

export function CalorieData({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const dayString = date.toLocaleDateString();
  const { data: foods = [] } = useFood(dayString);
  const { data: goal } = useGoal();
  const { data: quickAdds = [] } = useQuickAdd();
  const { data: preferences } = usePreferences();
  const { data: healthKitCaches = [] } = useHealthKitCache();
  const updateGoal = useUpdateGoal();

  // Fetch HealthKit data for this date if needed
  useFetchHealthKitData(date);

  const displayQuickAdds = quickAdds.length > 0 ? [...quickAdds, customQuickAdd] : defaultQuickAdds;

  const consumedCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  const cache = healthKitCaches.find((c) => c.day === dayString);
  const steps = cache?.steps ?? 0;
  const activeCalories = cache?.activeCalories ?? 0;
  const baseCalories = cache?.baseCalories ?? 0;
  const burnedCalories = activeCalories + baseCalories;

  const targetCalories = goal?.dietCalories ?? burnedCalories;
  const remainingCalories = targetCalories - consumedCalories;

  const handleEditGoal = () => {
    const newGoal = parseInt(prompt("Enter new goal") || "");
    if (!isNaN(newGoal) && newGoal > 0) {
      updateGoal.mutate({ dietCalories: newGoal });
    }
  };

  const handleDeleteGoal = () => {
    if (goal?.id) {
      updateGoal.mutate({ dietCalories: burnedCalories });
    }
  };

  return (
    <>
      <Text as="div" textAlign="center">
        <ArrowBackIos
          style={{ paddingTop: "10px" }}
          onClick={() => setDate(subDays(date, 1))}
        />
        <Text as="span" fontWeight="bold" margin="15%">
          {dayString}
        </Text>
        <ArrowForwardIos
          style={{ paddingTop: "10px" }}
          onClick={() => setDate(addDays(date, 1))}
        />
        {dayString !== new Date().toLocaleDateString() && (
          <Button onClick={() => setDate(new Date())}>today</Button>
        )}
      </Text>

      <Card>
        <Heading>
          Remaining Calories:{" "}
          <span style={{ color: remainingCalories > 0 ? "green" : "red" }}>
            {remainingCalories}
          </span>{" "}
          for {dayString}
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
            {!preferences?.hideSteps && steps > 0 && (
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
                <TableCell
                  onClick={handleDeleteGoal}
                  style={{ cursor: "pointer" }}
                >
                  <Delete />
                </TableCell>
              ) : (
                <TableCell
                  onClick={handleEditGoal}
                  style={{ cursor: "pointer" }}
                >
                  <Edit />
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              <TableCell>Consumed</TableCell>
              <TableCell>{consumedCalories} cals</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {!preferences?.hideProtein && (
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

      {foods.length > 0 && (
        <FoodTable foods={foods} preferences={preferences} />
      )}

      <AddCalorieFab
        quickAdds={displayQuickAdds}
        date={date}
        preferences={preferences}
      />
    </>
  );
}
