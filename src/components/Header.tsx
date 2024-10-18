import {
  Card,
  View,
  Heading,
  Text,
  useTheme,
  Grid,
  Image,
  Flex,
} from "@aws-amplify/ui-react";

export const Header = () => {
  const { tokens } = useTheme();
  return (
    <Grid
      templateColumns="3fr 1fr"
      templateRows="4rem"
      gap={tokens.space.small}
      marginBottom={tokens.space.medium}
    >
      <View>
        <Card>
          <Flex
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            alignContent="flex-start"
            wrap="nowrap"
            gap="1rem"
          >
            <View height="2rem">
              <Image
                objectFit={"initial"}
                src="/maskable.png"
                alt="icon"
                borderRadius={tokens.radii.large}
                height={"50px"}
              ></Image>
            </View>
            <View height="2rem">
              <Heading level={5}>fit.jpc.io</Heading>
              <Text as="span" fontSize={"small"}>
                Health tracker
              </Text>
            </View>
          </Flex>
        </Card>
      </View>
    </Grid>
  );
};
