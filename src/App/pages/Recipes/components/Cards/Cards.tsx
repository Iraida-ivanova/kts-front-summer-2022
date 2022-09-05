import React, { useCallback } from 'react';

import { useRecipesContext } from '@App/App';
import Loader from '@components/Loader';
import RecipeCard from '@pages/Recipes/components/RecipeCard';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import styles from './Cards.module.scss';

const Cards: React.FC = () => {
  const recipeListStore = useRecipesContext();
  let navigate = useNavigate();

  const getNextRecipes = useCallback(async () => {
    await recipeListStore.getRecipeList();
  }, [recipeListStore.getRecipeList]);

  return (
    <div>
      <InfiniteScroll
        dataLength={recipeListStore.list.length}
        next={getNextRecipes}
        hasMore={recipeListStore.hasMore}
        loader={<Loader />}
        className={styles.cards}
        style={{ overflow: 'hidden' }}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {recipeListStore.list.map((item) => (
          <div key={item.id} className={styles.cards__item}>
            <RecipeCard item={item} onClick={() => navigate(`${item.id}`)} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default observer(Cards);
