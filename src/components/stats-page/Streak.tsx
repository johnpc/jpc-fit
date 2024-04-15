import { useEffect, useState } from "react";
import { StreakInfo, getStreakInfo } from "../../helpers/getStreakInfo";
import { FoodEntity } from "../../data/entities";
import {
  Loader,
  useTheme,
  Grid,
  View,
  Heading,
  Text,
} from "@aws-amplify/ui-react";

export default function Streak(props: { allFoods: FoodEntity[] }) {
  const { tokens } = useTheme();

  const [streakInfo, setStreakInfo] = useState<StreakInfo>();
  const setup = async () => {
    const s = await getStreakInfo(props.allFoods, new Date());
    setStreakInfo(s);
  };
  useEffect(() => {
    setup();
  }, []);

  if (!streakInfo) return <Loader />;
  return (
    <Grid
      margin={tokens.space.small}
      templateColumns="1fr 1fr 1fr 1fr"
      gap={tokens.space.small}
    >
      <View columnSpan={4} textAlign={"center"}>
        Your streak is {streakInfo.currentStreakDays} days
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{streakInfo.threeDaysAgo.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{streakInfo.threeDaysAgo.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{streakInfo.twoDaysAgo.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{streakInfo.twoDaysAgo.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{streakInfo.yesterday.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{streakInfo.yesterday.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{streakInfo.today.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{streakInfo.today.day}</Text>
      </View>
    </Grid>
  );
}