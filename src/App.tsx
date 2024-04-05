import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { hasPermission } from "./helpers/getHealthKitData";
import { RequestPermission } from "./components/RequestPermission";
import { CalorieData } from "./components/CalorieData";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { App as CapacitorApp } from "@capacitor/app";
function App() {
  const [permission, setPermission] = useState<boolean>(false);
  const setup = async () => {
    const p = await hasPermission();
    setPermission(p);
  };
  useEffect(() => {
    setup();
    CapacitorApp.addListener("appStateChange", ({ isActive }) => {
      console.log({ appStateChange: true, isActive });
      if (isActive) {
        setup();
      }
    });
    CapacitorApp.addListener("resume", () => {
      setup();
    });
    return () => {
      CapacitorApp.removeAllListeners();
    }

  }, []);

  return (
    <>
      <Header />
      {permission ? (
        <CalorieData />
      ) : (
        <RequestPermission onPermissionGranted={setup} />
      )}
      <Footer />
    </>
  );
}

export default withAuthenticator(App);
