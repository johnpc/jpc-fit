import { StreakInfo } from "../../helpers/getStreakInfo";
import { FoodEntity } from "../../data/entities";
import {
  Loader,
  useTheme,
  Grid,
  View,
  Heading,
  Text,
} from "@aws-amplify/ui-react";

export default function Streak(props: {
  allFoods: FoodEntity[];
  streakInfo: StreakInfo;
}) {
  const { tokens } = useTheme();
  if (!props.streakInfo) return <Loader />;
  const netLbs = props.streakInfo.currentStreakNetCalories / 3500;
  return (
    <Grid
      margin={tokens.space.small}
      templateColumns="1fr 1fr 1fr 1fr"
      gap={tokens.space.small}
    >
      <View columnSpan={4} textAlign={"center"}>
        Your streak is {props.streakInfo.currentStreakDays} days (~<Text as="span" color={netLbs > 0 ? "red" : "green"}>{(Math.abs(netLbs)).toFixed(1)} lbs</Text>)
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>
          {props.streakInfo.threeDaysAgo.tracked ? "🔥" : "❌"}{" "}
        </Heading>
        <Text as="p">{props.streakInfo.threeDaysAgo.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{props.streakInfo.twoDaysAgo.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{props.streakInfo.twoDaysAgo.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{props.streakInfo.yesterday.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{props.streakInfo.yesterday.day}</Text>
      </View>
      <View borderRadius={tokens.radii.xxxl} textAlign={"center"}>
        <Heading>{props.streakInfo.today.tracked ? "🔥" : "❌"} </Heading>
        <Text as="p">{props.streakInfo.today.day}</Text>
      </View>
    </Grid>
  );
}
