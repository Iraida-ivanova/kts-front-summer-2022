import React, { createContext, useContext } from 'react';

import DetailRecipe from '@pages/DetailRecipe/DetailRecipe';
import Recipes from '@pages/Recipes';
import { Option, RecipeCard } from '@projectTypes/types';
import { apiKey } from '@utils/apiKey';
import { getRecipeCards } from '@utils/utils';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const numberOfElements = 6;
type RecipesContextType = {
  items: RecipeCard[];
  isLoading: boolean;
  getRecipes: (offset: number, type?: string) => Promise<void>;
  hasMore: boolean;
  pickedValues: Option[];
  setPickedValues: (val: Option[]) => void;
  error: string | null;
};
const RecipesContext = createContext<RecipesContextType>({
  items: [],
  isLoading: false,
  getRecipes: async () => {},
  hasMore: true,
  pickedValues: [],
  setPickedValues: (val: Option[]) => {},
  error: null,
});
export const useRecipesContext = () => useContext(RecipesContext);
const Provider = RecipesContext.Provider;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<null | string>(null);
  const [hasMore, setHasMore] = React.useState(true);
  const [items, setItems] = React.useState<RecipeCard[]>([]);
  const [pickedValues, setPickedValues] = React.useState<Option[]>([]);

  async function getRecipes(offset: number, type?: string) {
    // eslint-disable-next-line no-console
    console.log('request');
    setIsLoading(true);
    const result = await axios({
      method: 'get',
      url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${
        type ? `&type=${type}` : ''
      }&addRecipeNutrition=true&number=${numberOfElements}&offset=${offset}`,
    });
    if (result.status !== 200) {
      setError('HAVING PROBLEMS LOADING');
    }
    setIsLoading(false);
    const totalResult = result.data.totalResults;
    if (items.length >= totalResult) {
      setHasMore(false);
      return;
    }
    if (offset > 0) {
      setItems([...items, ...getRecipeCards(result.data.results)]);
    } else {
      setItems(getRecipeCards(result.data.results));
    }
  }

  return (
    <BrowserRouter>
      <Provider value={{ items, isLoading, getRecipes, hasMore, pickedValues, setPickedValues, error }}>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path={':id'} element={<DetailRecipe />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
