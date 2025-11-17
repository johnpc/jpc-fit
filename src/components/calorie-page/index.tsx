import { useState } from "react";
import { CalorieData } from "./CalorieData";

export default function CaloriePage() {
  const [date, setDate] = useState<Date>(new Date());

  return <CalorieData date={date} setDate={setDate} />;
}
