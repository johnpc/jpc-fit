import { QuickAddEntity } from "../../lib/types";

export const customQuickAdd: QuickAddEntity = {
  icon: "Restaurant",
  name: "Custom",
  calories: 0,
  protein: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  id: "dqa-Custom",
};

export const defaultQuickAdds: QuickAddEntity[] = [
  {
    icon: "Fastfood",
    name: "xx-small",
    calories: 100,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-100",
  },
  {
    icon: "Restaurant",
    name: "x-small",
    calories: 250,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-250",
  },
  {
    icon: "LocalPizza",
    name: "small",
    calories: 500,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-500",
  },
  {
    icon: "Restaurant",
    name: "medium",
    calories: 750,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-750",
  },
  {
    icon: "LocalPizza",
    name: "large",
    calories: 1000,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-1000",
  },
  {
    icon: "Fastfood",
    name: "x-large",
    calories: 1500,
    protein: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: "dqa-1500",
  },
  customQuickAdd,
];
