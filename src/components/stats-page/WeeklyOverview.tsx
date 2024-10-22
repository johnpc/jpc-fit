import { useState } from "react";
import { StreakInfo } from "../../helpers/getStreakInfo";
import {
  FoodEntity,
  HealthKitCacheEntity,
  PreferencesEntity,
} from "../../data/entities";
import {
  View,
  Text,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@aws-amplify/ui-react";
import { addDays, subDays } from "date-fns";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export const dateToDayString = (date: Date) => {
  const [d, m] = date.toLocaleDateString().split("/");
  return [d, m].join("/");
};

export const defaultDayInfo = (date: Date) => ({
  day: dateToDayString(date),
  tracked: false,
  consumedCalories: 0,
  burnedCalories: 0,
  steps: 0,
  activeCalories: 0,
  baseCalories: 0,
  netCalories: 0,
  dateString: date.toLocaleDateString(),
});

export default function WeeklyOverview(props: {
  allFoods: FoodEntity[];
  streakInfo?: StreakInfo;
  preferences: PreferencesEntity;
  healthKitCaches: HealthKitCacheEntity[];
}) {
  const [date, setDate] = useState<Date>(new Date());

  const streakInfo: StreakInfo = {
    currentStreakDays: props.streakInfo?.allStreakDays?.length || 0,
    currentStreakNetCalories:
      props.streakInfo?.allStreakDays?.reduce(
        (acc, day) => acc + day.netCalories,
        0,
      ) || 0,
    allStreakDays: props.streakInfo?.allStreakDays || [],
    today: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(date),
    ) ?? { ...defaultDayInfo(date) },
    yesterday: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 1)),
    ) ?? { ...defaultDayInfo(subDays(date, 1)) },
    twoDaysAgo: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 2)),
    ) ?? { ...defaultDayInfo(subDays(date, 2)) },
    threeDaysAgo: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 3)),
    ) ?? { ...defaultDayInfo(subDays(date, 3)) },
    fourDaysAgo: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 4)),
    ) ?? { ...defaultDayInfo(subDays(date, 4)) },
    fiveDaysAgo: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 5)),
    ) ?? { ...defaultDayInfo(subDays(date, 5)) },
    sixDaysAgo: props.streakInfo?.allStreakDays?.find(
      (day) => day.day === dateToDayString(subDays(date, 6)),
    ) ?? { ...defaultDayInfo(subDays(date, 6)) },
  };

  console.log({ streakInfo, pStreakInfo: props.streakInfo });

  // const streakInfo = props.streakInfo;

  const { burnedCalories, consumedCalories } = (
    Object.keys(streakInfo) as unknown as ("today" | "yesterday")[]
  ).reduce(
    (
      acc: { burnedCalories: number; consumedCalories: number },
      key: "today" | "yesterday",
    ) => {
      if (!streakInfo[key] || !streakInfo[key].burnedCalories) {
        return acc;
      }
      return {
        burnedCalories:
          acc.burnedCalories + streakInfo[key]?.burnedCalories || 0,
        consumedCalories:
          acc.consumedCalories + streakInfo[key]?.consumedCalories || 0,
      };
    },
    { burnedCalories: 0, consumedCalories: 0 },
  );

  const onPreviousWeek = () => setDate(subDays(date, 7));
  const onNextWeek = () => setDate(addDays(date, 7));
  const onToday = () => setDate(new Date());

  const tableCaption = (
    <>
      <ArrowBackIos style={{ paddingTop: "10px" }} onClick={onPreviousWeek} />
      <Text as="span" fontWeight={"bold"} margin={"15%"}>
        {subDays(date, 6).toLocaleDateString()} - {date.toLocaleDateString()}
      </Text>
      <ArrowForwardIos style={{ paddingTop: "10px" }} onClick={onNextWeek} />
    </>
  );
  return (
    <>
      <View
        columnSpan={4}
        textAlign={"center"}
        style={{
          color: burnedCalories - consumedCalories > 0 ? "green" : "red",
        }}
      >
        Net {consumedCalories - burnedCalories} calories for week of{" "}
        {date.toLocaleDateString()}
      </View>
      <View columnSpan={4} textAlign={"center"}>
        1 lb of fat is ~3500 calories
      </View>
      <Table caption={tableCaption} highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Day</TableCell>
            <TableCell as="th">Consumed</TableCell>
            <TableCell as="th">Burned</TableCell>
            <TableCell as="th">Net</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{streakInfo.today.day}</TableCell>
            <TableCell>{streakInfo.today.consumedCalories}</TableCell>
            <TableCell>{streakInfo.today.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.today.burnedCalories -
                    streakInfo.today.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.today.consumedCalories -
                streakInfo.today.burnedCalories}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{streakInfo.yesterday.day}</TableCell>
            <TableCell>{streakInfo.yesterday.consumedCalories}</TableCell>
            <TableCell>{streakInfo.yesterday.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.yesterday.burnedCalories -
                    streakInfo.yesterday.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.yesterday.consumedCalories -
                streakInfo.yesterday.burnedCalories}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{streakInfo.twoDaysAgo.day}</TableCell>
            <TableCell>{streakInfo.twoDaysAgo.consumedCalories}</TableCell>
            <TableCell>{streakInfo.twoDaysAgo.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.twoDaysAgo.burnedCalories -
                    streakInfo.twoDaysAgo.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.twoDaysAgo.consumedCalories -
                streakInfo.twoDaysAgo.burnedCalories}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{streakInfo.threeDaysAgo.day}</TableCell>
            <TableCell>{streakInfo.threeDaysAgo.consumedCalories}</TableCell>
            <TableCell>{streakInfo.threeDaysAgo.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.threeDaysAgo.burnedCalories -
                    streakInfo.threeDaysAgo.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.threeDaysAgo.consumedCalories -
                streakInfo.threeDaysAgo.burnedCalories}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{streakInfo.fourDaysAgo.day}</TableCell>
            <TableCell>{streakInfo.fourDaysAgo.consumedCalories}</TableCell>
            <TableCell>{streakInfo.fourDaysAgo.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.fourDaysAgo.burnedCalories -
                    streakInfo.fourDaysAgo.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.fourDaysAgo.consumedCalories -
                streakInfo.fourDaysAgo.burnedCalories}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{streakInfo.fiveDaysAgo.day}</TableCell>
            <TableCell>{streakInfo.fiveDaysAgo.consumedCalories}</TableCell>
            <TableCell>{streakInfo.fiveDaysAgo.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.fiveDaysAgo.burnedCalories -
                    streakInfo.fiveDaysAgo.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.fiveDaysAgo.consumedCalories -
                streakInfo.fiveDaysAgo.burnedCalories}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{streakInfo.sixDaysAgo.day}</TableCell>
            <TableCell>{streakInfo.sixDaysAgo.consumedCalories}</TableCell>
            <TableCell>{streakInfo.sixDaysAgo.burnedCalories}</TableCell>
            <TableCell
              style={{
                color:
                  streakInfo.sixDaysAgo.burnedCalories -
                    streakInfo.sixDaysAgo.consumedCalories >
                  0
                    ? "green"
                    : "red",
              }}
            >
              {streakInfo.sixDaysAgo.consumedCalories -
                streakInfo.sixDaysAgo.burnedCalories}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {date.toLocaleDateString() === new Date().toLocaleDateString() ? null : (
        <div style={{ textAlign: "center" }}>
          <Button onClick={onToday}>Today</Button>
        </div>
      )}
    </>
  );
}
