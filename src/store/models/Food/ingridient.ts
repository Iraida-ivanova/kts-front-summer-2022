export interface IIngredientApi {
  id: number;
  name: string;
}

export interface IIngredientModel {
  id: number;
  name: string;
}

export const normalizeIIngredient = (from: IIngredientApi): IIngredientModel => {
  const to = { ...from };
  to.id = from.id;
  to.name = from.name;
  return to;
};
