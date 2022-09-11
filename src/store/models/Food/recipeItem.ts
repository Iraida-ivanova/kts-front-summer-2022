import { IIngredientModel } from './ingridient';
import { INutritionApi, normalizeINutrition } from './nutrient';

export interface IRecipeItemApi {
  id: number;
  image: string;
  title: string;
  dishTypes: Array<string>;
  readyInMinutes: number;
  aggregateLikes: number;
  summary: string;
  nutrition: INutritionApi;
}

export type RecipeItemModel = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  ingredients: IIngredientModel[] | null;
  summary: string;
  likes: number;
  dishTypes: Array<string>;
  calories: string | null;
};

export const normalizeRecipeItem = (from: IRecipeItemApi): RecipeItemModel => {
  const normalisedNutrition = normalizeINutrition(from.nutrition);
  return {
    id: from.id,
    title: from.title,
    image: from.image,
    dishTypes: from.dishTypes,
    readyInMinutes: from.readyInMinutes,
    ingredients: normalisedNutrition.ingredients,
    calories: normalisedNutrition
      ? `${Math.round(normalisedNutrition.nutrients[0].amount)} ${normalisedNutrition.nutrients[0].unit}`
      : null,
    likes: from.aggregateLikes,
    summary: from.summary,
  };
};
