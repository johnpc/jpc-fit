import { Card, Text, Button, useTheme, Divider } from "@aws-amplify/ui-react";
import aphorisms from "./aphorisms-page/aphorisms.json";
import { useState } from "react";

export default function AphorismsPage() {
  const { tokens } = useTheme();
  const quotes = aphorisms.aphorisms;
  const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));
  const quote = quotes[index];

  const randomizeIndex = () => {
    setIndex(Math.floor(Math.random() * quotes.length));
  };

  return (
    <Card>
      <svg
        style={{
          height: tokens.space.xxl.value,
          width: tokens.space.xxl.value,
          color: tokens.colors.neutral[80].value,
        }}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>

      <Divider
        marginBottom={tokens.space.medium}
        marginTop={tokens.space.medium}
      />

      <Text
        variation="primary"
        as="p"
        display={"block"}
        lineHeight={tokens.lineHeights.medium}
        fontWeight={tokens.fontWeights.thin}
        fontSize={tokens.fontSizes.xxxl}
        fontStyle="oblique"
        textDecoration="none"
      >
        {quote}
      </Text>
      <Divider
        marginBottom={tokens.space.medium}
        marginTop={tokens.space.medium}
      />
      <Button isFullWidth onClick={() => randomizeIndex()}>
        Randomize Quote
      </Button>
    </Card>
  );
}
