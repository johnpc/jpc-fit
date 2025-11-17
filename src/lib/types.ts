export type FoodEntity = {
  id: string;
  name?: string | null;
  calories: number;
  protein?: number | null;
  day: string;
  notes?: string | null;
  photos?: (string | null)[] | null;
  createdAt: string;
  updatedAt: string;
};

export type GoalEntity = {
  id: string;
  dietCalories: number;
  createdAt: string;
  updatedAt: string;
};

export type QuickAddEntity = {
  id: string;
  name: string;
  calories: number;
  protein?: number | null;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

export type WeightEntity = {
  id: string;
  currentWeight: number;
  createdAt: string;
  updatedAt: string;
};

export type HeightEntity = {
  id: string;
  currentHeight: number;
  createdAt: string;
  updatedAt: string;
};

export type PreferencesEntity = {
  id?: string;
  hideProtein?: boolean | null;
  hideSteps?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
};

export type HealthKitCacheEntity = {
  id: string;
  activeCalories: number;
  baseCalories: number;
  weight?: number | null;
  steps?: number | null;
  day: string;
  createdAt: string;
  updatedAt: string;
};
