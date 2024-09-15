import {
  Card,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from "@aws-amplify/ui-react";
import { Height, MonitorWeight } from "@mui/icons-material";
import {
  HealthKitCacheEntity,
  HeightEntity,
  PreferencesEntity,
  WeightEntity,
  createHeight,
  createHeightListener,
  createWeight,
  createWeightListener,
  getHeight,
  getWeight,
  unsubscribeListener,
} from "../data/entities";
import { useEffect, useState } from "react";
import { getHealthKitData } from "../helpers/getHealthKitData";
import { BodyFatEyeTest } from "./weight-page/BodyFatEyeTest";

export default function WeightPage(props: {
  preferences: PreferencesEntity;
  healthKitCaches: HealthKitCacheEntity[];
  height?: HeightEntity;
  weight?: WeightEntity;
}) {
  const [weight, setWeight] = useState<WeightEntity | undefined>(props.weight);
  const [height, setHeight] = useState<HeightEntity | undefined>(props.height);

  useEffect(() => {
    const setup = async () => {
      const { weight } = await getHealthKitData(
        new Date(),
        props.healthKitCaches,
        props.preferences,
      );
      setWeight((await getWeight()) ?? { currentWeight: weight });
      setHeight((await getHeight()) ?? { currentHeight: 0 });
    };
    setup();
    const createWeightSubscription = createWeightListener(setup);
    const createHeightSubscription = createHeightListener(setup);
    return () => {
      unsubscribeListener(createWeightSubscription);
      unsubscribeListener(createHeightSubscription);
    };
  }, [props.preferences]);
  const handleEditWeight = async () => {
    const newWeight = parseInt(prompt("Enter your weight in lbs")!);
    if (Number.isNaN(newWeight) || newWeight < 1) {
      alert("Invalid integer");
      return;
    }

    await createWeight(newWeight);
  };

  const handleEditHeight = async () => {
    const newHeight = parseInt(prompt("Enter your height in inches")!);
    if (Number.isNaN(newHeight) || newHeight < 1) {
      alert("Invalid integer");
      return;
    }

    await createHeight(newHeight);
  };

  if (weight === undefined || height === undefined) return <Loader />;
  const bmi =
    (weight.currentWeight / (height.currentHeight * height.currentHeight)) *
    703;
  const getBmiLabel = (bmi: number) => {
    if (bmi < 18.5) return <>underweight</>;
    if (bmi < 25) return <>healthy</>;
    if (bmi < 30) return <>overweight</>;
    if (bmi < 35) return <>obese</>;
    if (bmi < 40) return <>obese - class 3</>;
    return <>obese - class 3</>;
  };
  const maxUnderweightLbs = (
    (18.5 / 703) *
    (height.currentHeight * height.currentHeight)
  ).toFixed(1);
  const maxHealthyLbs = (
    (25 / 703) *
    (height.currentHeight * height.currentHeight)
  ).toFixed(1);
  const maxOverweightLbs = (
    (30 / 703) *
    (height.currentHeight * height.currentHeight)
  ).toFixed(1);
  return (
    <>
      <Card>
        <Table caption="Healthkit data" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Data Type</TableCell>
              <TableCell as="th">Value</TableCell>
              <TableCell as="th">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Weight</TableCell>
              <TableCell>{weight.currentWeight} lbs</TableCell>
              <TableCell onClick={() => handleEditWeight()}>
                <MonitorWeight />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{height.currentHeight} inches</TableCell>
              <TableCell onClick={() => handleEditHeight()}>
                <Height />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BMI</TableCell>
              <TableCell>
                {bmi.toFixed(1)} ({getBmiLabel(bmi)})
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <Card>
        <Table caption="BMI range for your height" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">Classification</TableCell>
              <TableCell as="th">Min Weight</TableCell>
              <TableCell as="th">Max Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                Underweight <br />
                <Text as="div" fontSize="xs">
                  {"(bmi < 18.5)"}
                </Text>
              </TableCell>
              <TableCell>0 lbs</TableCell>
              <TableCell>{maxUnderweightLbs} lbs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Healthy <br />
                <Text as="div" fontSize="xs">
                  {"(bmi 18.5 - 25)"}
                </Text>
              </TableCell>
              <TableCell>{maxUnderweightLbs} lbs</TableCell>
              <TableCell>{maxHealthyLbs} lbs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Overweight <br />
                <Text as="div" fontSize="xs">
                  {"(bmi 25 - 30)"}
                </Text>
              </TableCell>
              <TableCell>{maxHealthyLbs} lbs</TableCell>
              <TableCell>{maxOverweightLbs} lbs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Obese <br />
                <Text as="div" fontSize="xs">
                  {"(bmi 35+)"}
                </Text>
              </TableCell>
              <TableCell>{maxOverweightLbs} lbs</TableCell>
              <TableCell>&#8734; lbs</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <BodyFatEyeTest />
    </>
  );
}
