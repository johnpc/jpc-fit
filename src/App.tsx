import "@aws-amplify/ui-react/styles.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { getHealthKitData, hasPermission } from "./helpers/getHealthKitData";
import { RequestPermission } from "./components/RequestPermission";
import { CalorieData } from "./components/CalorieData";
import { withAuthenticator } from "@aws-amplify/ui-react";
function App() {
  const [activeCalories, setActiveCalories] = useState<number>();
  const [baseCalories, setBaseCalories] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [permission, setPermission] = useState<boolean>(false);
  const setup = async () => {
    const p = await hasPermission();
    setPermission(p);
    if (p) {
      const { activeCalories, baseCalories, weight } = await getHealthKitData();
      setActiveCalories(activeCalories);
      setBaseCalories(baseCalories);
      setWeight(weight);
    }
  };
  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      <Header />
      {permission ? (
        <CalorieData
          activeCalories={activeCalories!}
          baseCalories={baseCalories!}
          weight={weight!}
        />
      ) : (
        <RequestPermission onPermissionGranted={setup} />
      )}
      <Footer />
    </>
  );
}

export default withAuthenticator(App);
