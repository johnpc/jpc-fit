import { useState } from "react";
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
import { useFood } from "../../hooks/useFood";
import { useHealthKitCache } from "../../hooks/useHealthKitCache";
import { useFetchHealthKitData } from "../../hooks/useFetchHealthKitData";

export function NetCaloriesTable() {
  const [date, setDate] = useState(new Date());

  // Get day strings for the week
  const dayStrings = Array.from({ length: 7 }, (_, i) =>
    subDays(date, i).toLocaleDateString()
  );

  // Query each day individually
  const day0 = { foods: useFood(dayStrings[0]), cache: useHealthKitCache(dayStrings[0]) };
  const day1 = { foods: useFood(dayStrings[1]), cache: useHealthKitCache(dayStrings[1]) };
  const day2 = { foods: useFood(dayStrings[2]), cache: useHealthKitCache(dayStrings[2]) };
  const day3 = { foods: useFood(dayStrings[3]), cache: useHealthKitCache(dayStrings[3]) };
  const day4 = { foods: useFood(dayStrings[4]), cache: useHealthKitCache(dayStrings[4]) };
  const day5 = { foods: useFood(dayStrings[5]), cache: useHealthKitCache(dayStrings[5]) };
  const day6 = { foods: useFood(dayStrings[6]), cache: useHealthKitCache(dayStrings[6]) };
  const dayQueries = [day0, day1, day2, day3, day4, day5, day6];

  // Fetch HealthKit data for all 7 days
  useFetchHealthKitData(subDays(date, 0));
  useFetchHealthKitData(subDays(date, 1));
  useFetchHealthKitData(subDays(date, 2));
  useFetchHealthKitData(subDays(date, 3));
  useFetchHealthKitData(subDays(date, 4));
  useFetchHealthKitData(subDays(date, 5));
  useFetchHealthKitData(subDays(date, 6));

  const getDayData = (daysAgo: number) => {
    const dayString = dayStrings[daysAgo];
    const dayFoods = dayQueries[daysAgo].foods.data ?? [];
    const cache = dayQueries[daysAgo].cache.data?.[0];
    const tracked = dayFoods.length > 0;
    const consumed = dayFoods.reduce((sum, f) => sum + f.calories, 0);
    const burned = (cache?.activeCalories || 0) + (cache?.baseCalories || 0);
    const [d, m] = dayString.split("/");
    return {
      day: `${d}/${m}`,
      consumed,
      burned,
      net: consumed - burned,
      tracked,
    };
  };

  const days = Array.from({ length: 7 }, (_, i) => getDayData(i));

  // Only count net for tracked days
  const trackedDays = days.filter((d) => d.tracked);
  const weekNet = trackedDays.reduce((sum, d) => sum + d.net, 0);
  const trackedCount = trackedDays.length;

  const tableCaption = (
    <>
      <ArrowBackIos
        style={{ paddingTop: "10px" }}
        onClick={() => setDate(subDays(date, 7))}
      />
      <Text as="span" fontWeight={"bold"} margin={"15%"}>
        {subDays(date, 6).toLocaleDateString()} - {date.toLocaleDateString()}
      </Text>
      <ArrowForwardIos
        style={{ paddingTop: "10px" }}
        onClick={() => setDate(addDays(date, 7))}
      />
    </>
  );

  return (
    <>
      <View
        columnSpan={4}
        textAlign={"center"}
        style={{ color: weekNet > 0 ? "red" : "green" }}
      >
        Net {weekNet} calories for {trackedCount} tracked day
        {trackedCount !== 1 ? "s" : ""}
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
          {days.map((d, i) => (
            <TableRow key={i}>
              <TableCell>{d.day}</TableCell>
              <TableCell>{d.consumed}</TableCell>
              <TableCell>{d.burned}</TableCell>
              <TableCell style={{ color: d.net > 0 ? "red" : "green" }}>
                {d.net}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {date.toLocaleDateString() !== new Date().toLocaleDateString() && (
        <div style={{ textAlign: "center" }}>
          <Button onClick={() => setDate(new Date())}>Today</Button>
        </div>
      )}
    </>
  );
}
