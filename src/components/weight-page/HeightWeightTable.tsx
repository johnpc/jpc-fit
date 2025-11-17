import { Card, Table, TableBody, TableCell, TableHead, TableRow } from "@aws-amplify/ui-react";
import { Height, MonitorWeight } from "@mui/icons-material";
import { useWeight, useCreateWeight } from "../../hooks/useWeight";
import { useHeight, useCreateHeight } from "../../hooks/useHeight";

export function HeightWeightTable() {
  const { data: weights = [], isLoading: weightsLoading } = useWeight();
  const { data: heights = [], isLoading: heightsLoading } = useHeight();
  const createWeight = useCreateWeight();
  const createHeight = useCreateHeight();

  console.log("Weights:", weights);
  console.log("Heights:", heights);

  const currentWeight = weights[0]?.currentWeight ?? 180;
  const currentHeight = heights[0]?.currentHeight ?? 70;

  const handleEditWeight = () => {
    const newWeight = parseInt(prompt("Enter your weight in lbs") || "");
    if (!isNaN(newWeight) && newWeight > 0) {
      console.log("Creating weight:", newWeight);
      createWeight.mutate({ currentWeight: newWeight }, {
        onSuccess: (data) => console.log("Weight created:", data),
        onError: (error) => console.error("Weight error:", error),
      });
    }
  };

  const handleEditHeight = () => {
    const newHeight = parseInt(prompt("Enter your height in inches") || "");
    if (!isNaN(newHeight) && newHeight > 0) {
      console.log("Creating height:", newHeight);
      createHeight.mutate({ currentHeight: newHeight }, {
        onSuccess: (data) => console.log("Height created:", data),
        onError: (error) => console.error("Height error:", error),
      });
    }
  };

  const bmi = (currentWeight / (currentHeight * currentHeight)) * 703;
  
  const getBmiLabel = (bmi: number) => {
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "healthy";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  if (weightsLoading || heightsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Table caption="Health data" highlightOnHover={false}>
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
            <TableCell>{currentWeight} lbs</TableCell>
            <TableCell onClick={handleEditWeight} style={{ cursor: "pointer" }}>
              <MonitorWeight />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{currentHeight} inches</TableCell>
            <TableCell onClick={handleEditHeight} style={{ cursor: "pointer" }}>
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
  );
}
