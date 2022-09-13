import React from 'react';

import DetailRecipe from 'pages/DetailRecipe/DetailRecipe';
import Recipes from 'pages/Recipes';
import { Route, Routes } from 'react-router-dom';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

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
