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
import { useEffect, useState } from "react";
import {
  FoodEntity,
  GoalEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
  QuickAddEntity,
  createGoal,
  deleteGoal,
} from "../../data/entities";
import AddCalorieFab from "./AddCalorieFab";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Delete,
  Edit,
} from "@mui/icons-material";
import { addDays, subDays } from "date-fns";
import { DayInfo, StreakInfo, getDayInfo } from "../../helpers/getStreakInfo";
import { FoodDetailPage } from "../FoodDetailPage";
import { FoodTableRow } from "./FoodTableRow";

export const CalorieData = (props: {
  goal?: GoalEntity;
  preferences?: PreferencesEntity;
  allFoods: FoodEntity[];
  quickAdds: QuickAddEntity[];
  streakInfo: StreakInfo;
  dayInfo: DayInfo;
  healthKitCaches: HealthKitCacheEntity[];
  onAdd: (food: FoodEntity) => void;
  onRemove: (food: FoodEntity) => void;
}) => {
  const [foodDetail, setFoodDetail] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const [dayInfo, setDayInfo] = useState<DayInfo>(props.dayInfo);
  const foods = props.allFoods.filter(
    (food) => food.day === date.toLocaleDateString(),
  );

  const onLeaveFoodDetail = () => {
    setFoodDetail(undefined);
  };

  useEffect(() => {
    console.log("CalorieData Effect Running");
    const setup = async () => {
      if (date.toLocaleDateString() === props.streakInfo.today.day) {
        setDayInfo(props.streakInfo.today);
      } else if (date.toLocaleDateString() === props.streakInfo.yesterday.day) {
        setDayInfo(props.streakInfo.yesterday);
      } else if (
        date.toLocaleDateString() === props.streakInfo.twoDaysAgo.day
      ) {
        setDayInfo(props.streakInfo.twoDaysAgo);
      } else if (
        date.toLocaleDateString() === props.streakInfo.threeDaysAgo.day
      ) {
        setDayInfo(props.streakInfo.threeDaysAgo);
      } else if (
        date.toLocaleDateString() === props.streakInfo.fourDaysAgo.day
      ) {
        setDayInfo(props.streakInfo.fourDaysAgo);
      } else if (
        date.toLocaleDateString() === props.streakInfo.fiveDaysAgo.day
      ) {
        setDayInfo(props.streakInfo.fiveDaysAgo);
      } else if (
        date.toLocaleDateString() === props.streakInfo.sixDaysAgo.day
      ) {
        setDayInfo(props.streakInfo.sixDaysAgo);
      } else {
        const dayInfo = await getDayInfo(
          props.allFoods,
          date,
          props.healthKitCaches,
          props.preferences,
        );
        setDayInfo(dayInfo);
      }
    };
    setup();
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

  const targetCalories = props.goal?.dietCalories ?? dayInfo.burnedCalories;
  const remainingCalories = targetCalories - consumedCalories;

  if (foodDetail) {
    return (
      <FoodDetailPage
        food={props.allFoods.find((f) => f.id === foodDetail)!}
        onLeaveFoodDetail={onLeaveFoodDetail}
      />
    );
  }
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
            {!dayInfo.steps ? null : (
              <TableRow>
                <TableCell>Steps</TableCell>
                <TableCell>{dayInfo.steps}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Active Calories</TableCell>
              <TableCell>{dayInfo.activeCalories} cals</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Base Calories</TableCell>
              <TableCell>{dayInfo.baseCalories} cals</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Goal</TableCell>
              <TableCell>{targetCalories} cals</TableCell>
              {props.goal?.dietCalories ? (
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
            {props.preferences?.hideProtein ? null : (
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
                {props.preferences?.hideProtein ? null : (
                  <TableCell as="th">Pr</TableCell>
                )}
                <TableCell as="th">
                  <Delete />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foods.map((food) => (
                <FoodTableRow
                  key={food.id}
                  food={food}
                  preferences={props.preferences}
                  setFoodDetail={setFoodDetail}
                  onRemove={props.onRemove}
                />
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : null}
      <AddCalorieFab
        preferences={props.preferences}
        quickAdds={props.quickAdds}
        date={date}
        onAdd={props.onAdd}
      />
    </>
  );
};
