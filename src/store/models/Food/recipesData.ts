import { IRecipeItemApi, normalizeRecipeItem, RecipeItemModel } from 'store/models/Food/recipeItem';

export type RecipesDataApi = {
  results: IRecipeItemApi[];
  offset: number;
  number: number;
  totalResults: number;
};

export type RecipesDataModel = {
  results: RecipeItemModel[];
  offset: number;
  number: number;
  totalResults: number;
};

export const normalizeRecipesData = (from: RecipesDataApi): RecipesDataModel => {
  return {
    results: from.results.map((item) => normalizeRecipeItem(item)),
    offset: from.offset,
    number: from.number,
    totalResults: from.totalResults,
  };
};
