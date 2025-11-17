import { HeightWeightTable } from "./HeightWeightTable";
import { BmiReferenceTable } from "./BmiReferenceTable";
import { StaticDropdownInfo } from "./StaticDropdownInfo";

export default function WeightPage() {
  return (
    <>
      <HeightWeightTable />
      <BmiReferenceTable />
      <StaticDropdownInfo />
    </>
  );
}
