import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Profiler, useEffect, useState } from "react";
import { hasPermission } from "./helpers/getHealthKitData";
import { RequestPermission } from "./components/settings-page/RequestPermission";
import { Heading, Image, Link, View, useTheme, withAuthenticator } from "@aws-amplify/ui-react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import TabsView from "./components/TabsView";
function App() {
  const [permission, setPermission] = useState<boolean>(false);
  const setup = async () => {
    const p = await hasPermission();
    setPermission(p);
  };
  useEffect(() => {
    setup();
    CapacitorApp.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        setup();
      }
    });
    CapacitorApp.addListener("resume", () => {
      setup();
    });
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, []);
  function onRenderCallback(
    id: string, // the "id" prop of the Profiler tree that has just committed
    phase: string, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration: number, // time spent rendering the committed update
    baseDuration: number, // estimated time to render the entire subtree without memoization
    startTime: number, // when React began rendering this update
    commitTime: number, // when React committed this update
  ) {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    });
  }

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      {permission ? (
        <TabsView />
      ) : (
        <RequestPermission onPermissionGranted={setup} />
      )}
      <Footer />
    </Profiler>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App, {
  components: {
    Header() {
      const { tokens } = useTheme();
      return (
        <View textAlign="center" backgroundColor={'palevioletred'} padding={'15px'}>
        <Image
          alt="logo"
          borderRadius={tokens.radii.xl}
          width={"100px"}
          src="/maskable.png"
        />
        <Heading fontSize={tokens.fontSizes.xl} color={tokens.colors.primary[90]}>jpc.fit</Heading>
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
