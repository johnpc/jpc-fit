import { Text, useTheme } from "@aws-amplify/ui-react";

export default function WhyBMI() {
  const { tokens } = useTheme();

  return (
    <>
      <Text
        variation="primary"
        as="p"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.normal}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        BMI is often criticized as a blunt and impersonal instrument. After all,
        it only considers weight and height to determine health - it doesn't
        consider relevant factors such as gender, genetics, muscle mass.{" "}
        <Text
          as="span"
          fontWeight={tokens.fontWeights.semibold}
          fontStyle={"oblique"}
        >
          Fun fact, Arnold Schwarzenegger in his prime was considered obese
          according to BMI measurement (he had a BMI of 30.2)!
        </Text>
      </Text>
      <Text
        variation="primary"
        as="p"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.normal}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        <Text
          as="span"
          fontWeight={tokens.fontWeights.semibold}
          fontStyle={"oblique"}
        >However, BMI's limits are not a "get out of dieting free" card.</Text> The Arnies of the world
        are extreme outliers.{" "}
        <Text
          as="span"
          fontWeight={tokens.fontWeights.semibold}
          fontStyle={"oblique"}
        >
          Athletes in the vast majority of sports fall within a healthy BMI
          range
        </Text>
        , including sports like swimming, UFC, and soccer where the athletes are
        quite muscular.
      </Text>
      <Text
        variation="primary"
        as="p"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.normal}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        In Olympic athletes, the average male BMI is 24 and the average female
        BMI is 21.6, both within the healthy BMI range. For the average person,
        whose lifestyle does not involve the extreme training regimens of elite
        athletes,{" "}
        <Text
          as="span"
          fontWeight={tokens.fontWeights.semibold}
          fontStyle={"oblique"}
        >
          BMI remains a relevant and practical tool to set healthy goals
        </Text>
        .
      </Text>
    </>
  );
}
