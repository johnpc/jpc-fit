import {
  Card,
  Image,
  Accordion,
} from "@aws-amplify/ui-react";
import femaleBfEyeTest from "../../images/female-bf-eye-test.webp";
import maleBfEyeTest from "../../images/male-bf-eye-test.jpg";
import bfChart from "../../images/bf-chart.jpeg";
import bmiChart from "../../images/bmi-chart.png";

export const BodyFatEyeTest = () => {
  return (
    <Card>
      <Accordion
        items={[
          {
            trigger: "BMI Chart",
            value: "bmiChart",
            content: <Image alt="bmiChart" src={bmiChart} />,
          },
          {
            trigger: "Male Body Fat % Eye Test",
            value: "maleBfEyeTest",
            content: <Image alt="maleBfEyeTest" src={maleBfEyeTest} />,
          },
          {
            trigger: "Female Body Fat % Eye Test",
            value: "femaleBfEyeTest",
            content: <Image alt="femaleBfEyeTest" src={femaleBfEyeTest} />,
          },
          {
            trigger: "Body Fat % Chart",
            value: "bfChart",
            content: <Image alt="bfChart" src={bfChart} />,
          },
        ]}
      />
    </Card>
  );
};
