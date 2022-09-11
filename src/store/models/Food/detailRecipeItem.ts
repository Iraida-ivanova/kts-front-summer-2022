import { IIngredientApi, IIngredientModel, normalizeIIngredient } from './ingridient';

export interface IDetailRecipeItemApi {
  id: number;
  image: string;
  title: string;
  dishTypes: Array<string>;
  readyInMinutes: number;
  aggregateLikes: number;
  summary: string;
  extendedIngredients: IIngredientApi[];
  instructions: string;
}

export type DetailRecipeItemModel = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  ingredients: IIngredientModel[];
  instructions: string | null;
  summary: string;
  likes: number;
  dishTypes: Array<string>;
};

export const normalizeDetailRecipeItem = (from: IDetailRecipeItemApi): DetailRecipeItemModel => {
  return {
    id: from.id,
    title: from.title,
    image: from.image,
    dishTypes: from.dishTypes,
    readyInMinutes: from.readyInMinutes,
    ingredients: from.extendedIngredients.map((item) => normalizeIIngredient(item)),
    likes: from.aggregateLikes,
    instructions: from.instructions || null,
    summary: from.summary,
  };
};
