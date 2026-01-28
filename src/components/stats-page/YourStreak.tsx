import { useTheme, Grid, View, Heading, Text } from "@aws-amplify/ui-react";
import { subDays } from "date-fns";
import { useFood } from "../../hooks/useFood";
import { useHealthKitCache } from "../../hooks/useHealthKitCache";

export function YourStreak() {
  const { tokens } = useTheme();

  // Get day strings for last 4 days
  const dayStrings = Array.from({ length: 4 }, (_, i) =>
    subDays(new Date(), i).toLocaleDateString()
  );

  // Query each day
  const day0 = { foods: useFood(dayStrings[0]), cache: useHealthKitCache(dayStrings[0]) };
  const day1 = { foods: useFood(dayStrings[1]), cache: useHealthKitCache(dayStrings[1]) };
  const day2 = { foods: useFood(dayStrings[2]), cache: useHealthKitCache(dayStrings[2]) };
  const day3 = { foods: useFood(dayStrings[3]), cache: useHealthKitCache(dayStrings[3]) };
  const dayQueries = [day0, day1, day2, day3];

  const getDayInfo = (daysAgo: number) => {
    const dayString = dayStrings[daysAgo];
    const dayFoods = dayQueries[daysAgo].foods.data ?? [];
    const cache = dayQueries[daysAgo].cache.data?.[0];
    const tracked = dayFoods.length > 0;
    const consumed = dayFoods.reduce((sum, f) => sum + f.calories, 0);
    const burned = (cache?.activeCalories || 0) + (cache?.baseCalories || 0);
    const [d, m] = dayString.split("/");
    return { tracked, day: `${d}/${m}`, net: consumed - burned };
  };

  const days = [getDayInfo(3), getDayInfo(2), getDayInfo(1), getDayInfo(0)];

  // Count streak from most recent day backwards
  let streakDays = 0;
  let streakNetCalories = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].tracked) {
      streakDays++;
      streakNetCalories += days[i].net;
    } else {
      break;
    }
  }

  const netLbs = streakNetCalories / 3500;

  return (
    <Grid
      margin={tokens.space.small}
      templateColumns="1fr 1fr 1fr 1fr"
      gap={tokens.space.small}
    >
      <View columnSpan={4} textAlign={"center"}>
        Your streak is {streakDays} days (~
        <Text as="span" color={netLbs > 0 ? "red" : "green"}>
          {Math.abs(netLbs).toFixed(1)} lbs
        </Text>
        )
      </View>
      {days.map((day, i) => (
        <View key={i} borderRadius={tokens.radii.xxxl} textAlign={"center"}>
          <Heading>{day.tracked ? "🔥" : "❌"}</Heading>
          <Text as="p">{day.day}</Text>
        </View>
      ))}
    </Grid>
  );
}
