import { IIngredientApi, IIngredientModel, normalizeIIngredient } from './ingridient';

export interface INutritionApi {
  nutrients: NutrientApi[];
  ingredients: IIngredientApi[];
}

export interface INutritionModel {
  nutrients: NutrientModel[];
  ingredients: IIngredientModel[];
}

export const normalizeINutrition = (from: INutritionApi): INutritionModel => {
  const to = { ...from };
  to.nutrients = from.nutrients.map((item) => normalizeNutrient(item));
  to.ingredients = from.ingredients.map((item) => normalizeIIngredient(item));
  return to;
};

export type NutrientApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export type NutrientModel = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};

export const normalizeNutrient = (from: NutrientApi): NutrientModel => {
  return {
    name: from.name,
    amount: from.amount,
    unit: from.unit,
    percentOfDailyNeeds: from.percentOfDailyNeeds,
  };
};
