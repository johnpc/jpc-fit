import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { hasPermission } from "./helpers/getHealthKitData";
import { RequestPermission } from "./components/settings-page/RequestPermission";
import { Link, withAuthenticator } from "@aws-amplify/ui-react";
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
