import React, { createContext, useContext } from 'react';

import DetailRecipe from '@pages/DetailRecipe/DetailRecipe';
import Recipes from '@pages/Recipes';
import RecipeListStore from '@store/RecipeListStore';
import { useLocalStore } from '@utils/UseLocalStore';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RecipesContext = createContext<RecipeListStore>(new RecipeListStore());
export const useRecipesContext = () => useContext(RecipesContext);

const App: React.FC = () => {
  const store = useLocalStore(() => new RecipeListStore());
  return (
    <BrowserRouter>
      <RecipesContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path={':id'} element={<DetailRecipe />} />
        </Routes>
      </RecipesContext.Provider>
    </BrowserRouter>
  );
};

export default App;
