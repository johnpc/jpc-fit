import { Text, useTheme } from "@aws-amplify/ui-react";
import { HelpOutline } from "@mui/icons-material";

export function TShirtSizeDisclaimer() {
  const { tokens } = useTheme();

  return (
    <Text
      variation="primary"
      as="span"
      display={"block"}
      lineHeight={tokens.lineHeights.medium}
      fontWeight={tokens.fontWeights.normal}
      fontSize={tokens.fontSizes.medium}
      textDecoration="none"
      margin={tokens.space.small}
    >
      <HelpOutline fontSize={tokens.fontSizes.small.name as "small"} /> Why
      does jpc.fit default to t-shirt sizes when reporting calories consumed?
      <Text
        variation="primary"
        as="span"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.bold}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        The philosophy of jpc.fit is that mindful eating is more important
        than counting every calorie exactly perfectly.
      </Text>
      <Text
        variation="primary"
        as="span"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.bold}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        In the USA, it is legal for calorie labels be wrong by up to 20%. The
        painstaking math to calculate the calories of each ingredient is not
        worth the effort. Instead, we recommend loose estimation (and round up
        when it makes sense!)
      </Text>
      <Text
        variation="primary"
        as="span"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.bold}
        fontSize={tokens.fontSizes.small}
        textDecoration="none"
        margin={tokens.space.small}
      >
        If this philosophy doesn't work for you, you can create custom quick
        adds for your most common meals to reduce the effort of entering
        calories consumed.
      </Text>
    </Text>
  );
}
