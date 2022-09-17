import { Option } from 'projectTypes/types';
import { IIngredientApi } from 'store/models/Food/ingridient';

export const getTypes = (options: Option[]): string => {
  return options.map((item) => item.key).join(', ');
};

export const getStringOfIngredients = (ingredients: IIngredientApi[]): string => {
  return ingredients.map((item) => item.name).join(' + ');
};
