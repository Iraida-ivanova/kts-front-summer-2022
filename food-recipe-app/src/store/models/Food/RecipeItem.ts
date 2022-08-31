import { IIngredientApi } from './Ingridient';
import { INutritionApi } from './Nutrient';

// interface IRecipeItemApi {
//   id: number;
//   image: string;
//   title: string;
//   dishTypes: Array<string>;
//   readyInMinutes: number;
//   aggregateLikes: number;
//   summary: string;
//   extendedIngredients?: IIngredientApi[];
//   instructions?: string;
//   nutrition?: INutritionApi;
// }

// export type RecipeItemApi = {
//   id: number;
//   image: string;
//   imageType: string;
//   title: string;
//   vegetarian: true;
//   vegan: boolean;
//   dishTypes: Array<string>;
//   glutenFree: boolean;
//   dairyFree: boolean;
//   veryHealthy: boolean;
//   cheap: boolean;
//   veryPopular: boolean;
//   sustainable: boolean;
//   lowFodmap: boolean;
//   weightWatcherSmartPoints: number;
//   gaps: string;
//   preparationMinutes: number;
//   cookingMinutes: number;
//   aggregateLikes: number;
//   healthScore: number;
//   creditsText: string;
//   license: string;
//   sourceName: string;
//   pricePerServing: number;
//   readyInMinutes: number;
//   servings: number;
//   sourceUrl: string;
//   nutrition: Record<string, Array<Record<string, string | number | Array<Record<string, string | number>>>>>;
//   summary: string;
//   cuisines: Array<string>;
//   diets: Array<string>;
//   occasions: Array<any>;
//   analyzedInstructions: Array<
//     Record<string, string | Array<Record<string, string | number | Array<Record<string, string | number>>>>>
//   >;
//   spoonacularSourceUrl: string;
//   extendedIngredients?: Array<
//     Record<string, string | number | Array<string | Record<string, Record<string, string | number>>>>
//   >;
//   originalId?: number | null;
//   winePairing?: Record<any, any>;
//   instructions?: string;
// };
// export type RecipeCard = {
//   id: number;
//   image: string;
//   title: string;
//   subtitle?: string;
//   content?: string;
//   likes: number;
//   types: string;
//   readyInMinutes: number;
// };

// export type RecipeItemModel = {
//   id: number;
//   image: string;
//   title: string;
//   readyInMinutes: number;
//   ingredients: IIngredientApi[] | null;
//   instructions: string | null;
//   summary: string;
//   likes: number;
//   dishTypes: Array<string>;
//   calories: string | null;
// };
// export const normalizeRecipeItem = (from: IRecipeItemApi): RecipeItemModel => {
//   return {
//     id: from.id,
//     title: from.title,
//     image: from.image,
//     dishTypes: from.dishTypes,
//     readyInMinutes: from.readyInMinutes,
//     ingredients: from.nutrition?.ingredients || from.extendedIngredients || null,
//     calories: from.nutrition
//       ? `${Math.round(from.nutrition.nutrients[0].amount)} ${from.nutrition.nutrients[0].unit}`
//       : null,
//     likes: from.aggregateLikes,
//     instructions: from.instructions || null,
//     summary: from.summary,
//   };
// };
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
  ingredients: IIngredientApi[] | null;
  summary: string;
  likes: number;
  dishTypes: Array<string>;
  calories: string | null;
};
export const normalizeRecipeItem = (from: IRecipeItemApi): RecipeItemModel => {
  return {
    id: from.id,
    title: from.title,
    image: from.image,
    dishTypes: from.dishTypes,
    readyInMinutes: from.readyInMinutes,
    ingredients: from.nutrition?.ingredients,
    calories: from.nutrition
      ? `${Math.round(from.nutrition.nutrients[0].amount)} ${from.nutrition.nutrients[0].unit}`
      : null,
    likes: from.aggregateLikes,
    summary: from.summary,
  };
};
