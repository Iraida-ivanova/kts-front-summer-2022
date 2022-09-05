import { Option } from '@projectTypes/types';
import { IIngredientApi } from '@store/models/Food/Ingridient';

export const getStringOfTypes = (options: Option[]): string => {
  return options.map((item) => item.key).join(',');
};
export const getTypes = (options: Option[]): string => {
  return options.map((item) => item.key).join(', ');
};
export const getStringOfIngredients = (ingredients: IIngredientApi[]): string => {
  return ingredients.map((item) => item.name).join(' + ');
};
