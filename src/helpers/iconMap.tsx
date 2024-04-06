import {
  BakeryDining,
  Bento,
  BreakfastDining,
  BrunchDining,
  Cake,
  DinnerDining,
  Egg,
  EggAlt,
  EmojiFoodBeverage,
  Fastfood,
  FoodBank,
  Icecream,
  KebabDining,
  Kitchen,
  Liquor,
  LocalBar,
  LocalCafe,
  LocalDining,
  LocalPizza,
  LunchDining,
  Nightlife,
  QuestionMark,
  RamenDining,
  Restaurant,
  RestaurantMenu,
  RiceBowl,
  SetMeal,
  SoupKitchen,
  TakeoutDining,
  Tapas,
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
  {
    iconName: "EmojiFoodBeverage",
    component: <EmojiFoodBeverage />,
  },
  {
    iconName: "FoodBank",
    component: <FoodBank />,
  },
  {
    iconName: "DinnerDining",
    component: <DinnerDining />,
  },
  {
    iconName: "Icecream",
    component: <Icecream />,
  },
  {
    iconName: "KebabDining",
    component: <KebabDining />,
  },
  {
    iconName: "Kitchen",
    component: <Kitchen />,
  },
  {
    iconName: "LocalDining",
    component: <LocalDining />,
  },
  {
    iconName: "RiceBowl",
    component: <RiceBowl />,
  },
  {
    iconName: "Bento",
    component: <Bento />,
  },
  {
    iconName: "Cake",
    component: <Cake />,
  },
  {
    iconName: "Egg",
    component: <Egg />,
  },
  {
    iconName: "EggAlt",
    component: <EggAlt />,
  },
  {
    iconName: "RestaurantMenu",
    component: <RestaurantMenu />,
  },
  {
    iconName: "SetMeal",
    component: <SetMeal />,
  },
  {
    iconName: "SoupKitchen",
    component: <SoupKitchen />,
  },
  {
    iconName: "TakeoutDining",
    component: <TakeoutDining />,
  },
  {
    iconName: "Tapas",
    component: <Tapas />,
  },
  {
    iconName: "BreakfastDining",
    component: <BreakfastDining />,
  },
  {
    iconName: "BrunchDining",
    component: <BrunchDining />,
  },
  {
    iconName: "Liquor",
    component: <Liquor />,
  },
  {
    iconName: "LocalBar",
    component: <LocalBar />,
  },
  {
    iconName: "LocalCafe",
    component: <LocalCafe />,
  },
  {
    iconName: "Nightlife",
    component: <Nightlife />,
  },
  {
    iconName: "LunchDining",
    component: <LunchDining />,
  },
];
