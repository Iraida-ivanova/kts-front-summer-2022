import React, { createContext, useContext, useEffect } from 'react';

import DetailRecipe from '@pages/DetailRecipe/DetailRecipe';
import Recipes from '@pages/Recipes';
import { Option, RecipeCard } from '@projectTypes/types';
import { apiKey } from '@utils/apiKey';
import { getRecipeCards, getStringOfTypes } from '@utils/utils';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type RecipesContextType = {
  items: RecipeCard[];
  isLoading: boolean;
  getRecipes: (offset: number, type?: string) => Promise<void>;
  hasMore: boolean;
  pickedValues: Option[];
  setPickedValues: (val: Option[]) => void;
};
const RecipesContext = createContext<RecipesContextType>({
  items: [],
  isLoading: false,
  getRecipes: async () => {},
  hasMore: true,
  pickedValues: [],
  setPickedValues: (val: Option[]) => {},
});
export const useRecipesContext = () => useContext(RecipesContext);
const Provider = RecipesContext.Provider;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [items, setItems] = React.useState<RecipeCard[]>([]);
  const [pickedValues, setPickedValues] = React.useState<Option[]>([]);
  useEffect(() => {
    pickedValues.length ? getRecipes(0, getStringOfTypes(pickedValues)) : getRecipes(0);
  }, [pickedValues]);
  async function getRecipes(offset: number, type?: string) {
    setIsLoading(true);
    const result = await axios({
      method: 'get',
      url: type
        ? `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&addRecipeNutrition=true&number=6&offset=${offset}`
        : `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true&number=6&offset=${offset}`,
    });
    if (result.status !== 200) {
      throw new Error(result.statusText);
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
      <Provider value={{ items, isLoading, getRecipes, hasMore, pickedValues, setPickedValues }}>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path={':id'} element={<DetailRecipe />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
