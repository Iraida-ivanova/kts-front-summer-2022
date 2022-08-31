import { IIngredientApi } from './Ingridient';

export interface INutritionApi {
  nutrients: NutrientApi[];
  ingredients: IIngredientApi[];
}
export type NutrientApi = {
  name: string;
  amount: number;
  unit: string;
  percentOfDailyNeeds: number;
};
