export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};
export type RecipeItemApi = {
  id: number;
  image: string;
  imageType: string;
  title: string;
  vegetarian: true;
  vegan: boolean;
  dishTypes: Array<string>;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  nutrition: Record<string, Array<Record<string, string | number | Array<Record<string, string | number>>>>>;
  offset: number;
  umber: number;
  totalResults: number;
};
export type RecipeCard = {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  content?: string;
  likes: number;
  types: string;
  readyInMinutes: number;
};
export type RecipeItem = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  ingredients: Array<string>;
  instructions: string;
  summary: string;
  likes: number;
  dishTypes: Array<string>;
};
