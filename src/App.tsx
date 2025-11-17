import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";
import { useAuth } from "./hooks/useAuth";
import { useFood } from "./hooks/useFood";
import { Authenticator } from "@aws-amplify/ui-react";
import TabsView from "./components/TabsView";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HealthKitPermission } from "./components/settings-page/HealthKitPermission";
import { updateWidget } from "./helpers/updateWidget";
import "./App.css";

const HAS_PERMISSION_KEY = "hasPermission";

function App() {
  const { user, loading } = useAuth();
  const { data: foods = [] } = useFood();
  const [hasPermission, setHasPermission] = useState(
    Capacitor.getPlatform() !== "ios" ||
      localStorage.getItem(HAS_PERMISSION_KEY) === HAS_PERMISSION_KEY,
  );

  const checkPermission = () => {
    const permitted =
      Capacitor.getPlatform() !== "ios" ||
      localStorage.getItem(HAS_PERMISSION_KEY) === HAS_PERMISSION_KEY;
    setHasPermission(permitted);
  };

  useEffect(() => {
    if (Capacitor.getPlatform() !== "ios") return;

    checkPermission();

    CapacitorApp.addListener("appStateChange", ({ isActive }) => {
      if (isActive) {
        checkPermission();
      } else {
        // Update widget when app goes to background
        const todaysCalories = foods
          .filter((f) => f.day === new Date().toLocaleDateString())
          .reduce((sum, f) => sum + f.calories, 0);
        updateWidget(todaysCalories);
      }
    });

    CapacitorApp.addListener("resume", () => {
      checkPermission();
    });

    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [foods]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Authenticator
        components={{
          Header() {
            return (
              <div
                style={{
                  textAlign: "center",
                  backgroundColor: "palevioletred",
                  padding: "15px",
                }}
              >
                <img
                  alt="logo"
                  style={{ borderRadius: "12px", width: "100px" }}
                  src="/maskable.png"
                />
                <h1
                  style={{
                    fontSize: "24px",
                    color: "#f0f0f0",
                    margin: "10px 0",
                  }}
                >
                  jpc.fit
                </h1>
              </div>
            );
          },
          Footer() {
            return (
              <div style={{ textAlign: "center", padding: "20px" }}>
                {Capacitor.getPlatform() !== "ios" && (
                  <a
                    href="https://apps.apple.com/us/app/jpc-fit/id6482482386"
                    style={{ color: "white" }}
                  >
                    Download the app for iOS devices
                  </a>
                )}
              </div>
            );
          },
        }}
      />
    );
  }

  if (!hasPermission) {
    return <HealthKitPermission />;
  }

  return (
    <>
      <Header />
      <TabsView />
      <Footer />
    </>
  );
}

export default App;
