import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from "@aws-amplify/ui-react";
import { useHeight } from "../../hooks/useHeight";

export function BmiReferenceTable() {
  const { data: heights = [] } = useHeight();

  const currentHeight = heights[0]?.currentHeight ?? 70;

  const maxUnderweightLbs = (
    (18.5 / 703) *
    (currentHeight * currentHeight)
  ).toFixed(1);
  const maxHealthyLbs = ((25 / 703) * (currentHeight * currentHeight)).toFixed(
    1,
  );
  const maxOverweightLbs = (
    (30 / 703) *
    (currentHeight * currentHeight)
  ).toFixed(1);

  return (
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
              Underweight
              <br />
              <Text as="div" fontSize="xs">
                {"(bmi < 18.5)"}
              </Text>
            </TableCell>
            <TableCell>0 lbs</TableCell>
            <TableCell>{maxUnderweightLbs} lbs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Healthy
              <br />
              <Text as="div" fontSize="xs">
                {"(bmi 18.5 - 25)"}
              </Text>
            </TableCell>
            <TableCell>{maxUnderweightLbs} lbs</TableCell>
            <TableCell>{maxHealthyLbs} lbs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Overweight
              <br />
              <Text as="div" fontSize="xs">
                {"(bmi 25 - 30)"}
              </Text>
            </TableCell>
            <TableCell>{maxHealthyLbs} lbs</TableCell>
            <TableCell>{maxOverweightLbs} lbs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Obese
              <br />
              <Text as="div" fontSize="xs">
                {"(bmi 30+)"}
              </Text>
            </TableCell>
            <TableCell>{maxOverweightLbs} lbs</TableCell>
            <TableCell>&#8734; lbs</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
