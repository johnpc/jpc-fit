"use client";
import {
  Card,
  Image,
  View,
  Flex,
  Text,
  Button,
  useTheme,
  Link,
} from "@aws-amplify/ui-react";
import { Capacitor } from "@capacitor/core";

export const Footer = () => {
  const { tokens } = useTheme();
  return (
    <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          alignContent="flex-start"
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            alignContent="flex-start"
            gap={tokens.space.xs}
          >
            <Flex
              as="span"
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              alignContent="flex-start"
              gap={tokens.space.xs}
            >
              <Button as="a" href="https://github.com/johnpc/jpc-golf-gen2">
                <Image alt="github" src="/github.png" />
              </Button>
              <Text as="span">fit.jpc.io is open source.</Text>
              {Capacitor.getPlatform() === "ios" ? null : (
                <Link href="https://apps.apple.com/us/app/jpc-fit/id6482482386">
                  Download iOS app
                </Link>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </View>
  );
};
