import { useState } from "react";
import { View, Text, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@aws-amplify/ui-react";
import { addDays, subDays } from "date-fns";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useFood } from "../../hooks/useFood";
import { useHealthKitCache } from "../../hooks/useHealthKitCache";
import { useFetchHealthKitData } from "../../hooks/useFetchHealthKitData";

export function NetCaloriesTable() {
  const [date, setDate] = useState(new Date());
  const { data: foods = [] } = useFood();
  const { data: healthKitCaches = [] } = useHealthKitCache();

  // Fetch HealthKit data for all 7 days in the week
  for (let i = 0; i < 7; i++) {
    useFetchHealthKitData(subDays(date, i));
  }

  const getDayData = (daysAgo: number) => {
    const day = subDays(date, daysAgo);
    const dayString = day.toLocaleDateString();
    const dayFoods = foods.filter((f) => f.day === dayString);
    const tracked = dayFoods.length > 0;
    const consumed = dayFoods.reduce((sum, f) => sum + f.calories, 0);
    const cache = healthKitCaches.find((c) => c.day === dayString);
    const burned = (cache?.activeCalories || 0) + (cache?.baseCalories || 0);
    const [d, m] = dayString.split("/");
    return { day: `${d}/${m}`, consumed, burned, net: consumed - burned, tracked };
  };

  const days = Array.from({ length: 7 }, (_, i) => getDayData(i));
  
  // Only count net for tracked days
  const trackedDays = days.filter(d => d.tracked);
  const weekNet = trackedDays.reduce((sum, d) => sum + d.net, 0);
  const trackedCount = trackedDays.length;

  const tableCaption = (
    <>
      <ArrowBackIos style={{ paddingTop: "10px" }} onClick={() => setDate(subDays(date, 7))} />
      <Text as="span" fontWeight={"bold"} margin={"15%"}>
        {subDays(date, 6).toLocaleDateString()} - {date.toLocaleDateString()}
      </Text>
      <ArrowForwardIos style={{ paddingTop: "10px" }} onClick={() => setDate(addDays(date, 7))} />
    </>
  );

  return (
    <>
      <View columnSpan={4} textAlign={"center"} style={{ color: weekNet > 0 ? "red" : "green" }}>
        Net {weekNet} calories for {trackedCount} tracked day{trackedCount !== 1 ? 's' : ''}
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
