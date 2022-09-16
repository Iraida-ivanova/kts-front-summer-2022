export interface IRecipeListStore {
  getRecipeList(offset: number, number?: number): Promise<void>;
}
