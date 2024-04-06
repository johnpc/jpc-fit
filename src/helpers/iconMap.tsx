import {
  BakeryDining,
  Fastfood,
  LocalPizza,
  QuestionMark,
  RamenDining,
  Restaurant,
} from "@mui/icons-material";
import { ReactElement } from "react";

export const findIcon = (iconName: string) => {
  const icon = iconList.find(
    (iconListing) => iconListing.iconName === iconName,
  )?.component;
  if (!icon) {
    return <QuestionMark />;
  }
  return icon;
};

export const iconList: { iconName: string; component: ReactElement }[] = [
  {
    iconName: "BakeryDining",
    component: <BakeryDining />,
  },
  {
    iconName: "Fastfood",
    component: <Fastfood />,
  },
  {
    iconName: "LocalPizza",
    component: <LocalPizza />,
  },
  {
    iconName: "RamenDining",
    component: <RamenDining />,
  },
  {
    iconName: "Restaurant",
    component: <Restaurant />,
  },
];
