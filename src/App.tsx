import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { hasPermission } from "./helpers/getHealthKitData";
import { RequestPermission } from "./components/settings-page/RequestPermission";
import {
  Heading,
  Image,
  Link,
  View,
  useTheme,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import TabsView from "./components/TabsView";
import { getCache, HAS_PERMISSION_KEY } from "./data/cache";
function App() {
  const [permission, setPermission] = useState<boolean>(
    getCache(HAS_PERMISSION_KEY) === HAS_PERMISSION_KEY,
  );
  const setup = async () => {
    const p = await hasPermission();
    setPermission(p);
  };
  useEffect(() => {
    console.log("App.tsx Effect Running");
    setup();
    CapacitorApp.addListener("appStateChange", ({ isActive }) => {
      if (isActive && !permission) {
        setup();
      }
    });
    CapacitorApp.addListener("resume", () => {
      if (!permission) {
        setup();
      }
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);

  return (
    <>
      <Header />
      {permission ? (
        <TabsView />
      ) : (
        <RequestPermission onPermissionGranted={setup} />
      )}
      <Footer />
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App, {
  components: {
    Header() {
      const { tokens } = useTheme();
      return (
        <View
          textAlign="center"
          backgroundColor={"palevioletred"}
          padding={"15px"}
        >
          <Image
            alt="logo"
            borderRadius={tokens.radii.xl}
            width={"100px"}
            src="/maskable.png"
          />
          <Heading
            fontSize={tokens.fontSizes.xl}
            color={tokens.colors.primary[90]}
          >
            jpc.fit
          </Heading>
        </View>
      );
    },
    Footer: () => (
      <div
        style={{
          textAlign: "center",
        }}
      >
        {Capacitor.getPlatform() === "ios" ? null : (
          <Link
            href="https://apps.apple.com/us/app/jpc-fit/id6482482386"
            style={{
              color: "white",
            }}
          >
            Download the app for iOS devices
          </Link>
        )}
      </div>
    ),
  },
});
