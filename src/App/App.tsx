import React from 'react';

import DetailRecipe from '@pages/DetailRecipe/DetailRecipe';
import Recipes from '@pages/Recipes';
import { useQueryParamsStoreInit } from '@store/RootStore/hooks/useQueryParamsStoreInit';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  useQueryParamsStoreInit();
  return (
    <Routes>
      <Route path="/" element={<Recipes />} />
      <Route path={'/recipe/:recipeId'} element={<DetailRecipe />} />
    </Routes>
  );
};

export default App;
