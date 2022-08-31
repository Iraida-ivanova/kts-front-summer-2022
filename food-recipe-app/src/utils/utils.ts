import { Option } from '@projectTypes/types';
import { IIngredientApi } from '@store/models/Food/Ingridient';

// export const getRecipeCards = (data: RecipeItemApi[]): RecipeCard[] => {
//   return data.map((item: RecipeItemApi) => ({
//     id: item.id,
//     title: item.title,
//     image: item.image,
//     types: item.dishTypes.join(', '),
//     readyInMinutes: item.readyInMinutes,
//     subtitle: item.nutrition.ingredients
//       .reduce(
//         (acc: string, item: Record<string, string | number | Array<Record<string, string | number>>>) =>
//           acc + ` + ${item.name}`,
//         ''
//       )
//       .slice(2),
//     content: `${Math.round(item.nutrition.nutrients[0].amount as number)} ${item.nutrition.nutrients[0].unit}`,
//     likes: item.aggregateLikes,
//   }));
// };
export const getStringOfTypes = (options: Option[]): string => {
  return options.map((item) => item.key).join(',');
};
export const getTypes = (options: Option[]): string => {
  return options.map((item) => item.key).join(', ');
};
export const getStringOfIngredients = (ingredients: IIngredientApi[]): string => {
  return ingredients
    .map((item) => item.name)
    .join(' + ')
    .slice(2);
};
