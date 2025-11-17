import { useTheme, Grid, View, Heading, Text } from "@aws-amplify/ui-react";
import { subDays } from "date-fns";
import { useFood } from "../../hooks/useFood";
import { useHealthKitCache } from "../../hooks/useHealthKitCache";

export function YourStreak() {
  const { tokens } = useTheme();
  const { data: foods = [] } = useFood();
  const { data: healthKitCaches = [] } = useHealthKitCache();

  const getDayInfo = (daysAgo: number) => {
    const date = subDays(new Date(), daysAgo);
    const dayString = date.toLocaleDateString();
    const dayFoods = foods.filter((f) => f.day === dayString);
    const tracked = dayFoods.length > 0;
    const consumed = dayFoods.reduce((sum, f) => sum + f.calories, 0);
    const cache = healthKitCaches.find((c) => c.day === dayString);
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
