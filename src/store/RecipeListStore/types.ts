// export type GetOrganizationReposListParams = {
//   organizationName: string;
// };
//
// export type PostOrganizationReposListParams = {
//   organizationName: string;
//   data: object;
// };

export interface IRecipeListStore {
  getRecipeList(): Promise<void>;
}
