import React from 'react';

import { useRecipesContext } from '@App/App';
import RecipeCard from '@pages/Recipes/components/RecipeCard';
import { Meta } from '@projectTypes/enums';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import styles from './Cards.module.scss';
const Cards: React.FC = () => {
  const recipeListStore = useRecipesContext();
  let navigate = useNavigate();
  async function getNextRecipes() {
    await recipeListStore.getRecipeList();
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={recipeListStore.list.length}
        next={getNextRecipes}
        hasMore={recipeListStore.hasMore}
        loader={'LOADING...'}
        className={styles.cards}
        style={{ overflow: 'hidden' }}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {recipeListStore.meta === Meta.success
          ? recipeListStore.list.map((item) => (
              <div key={item.id} className={styles.cards__item}>
                <RecipeCard item={item} onClick={() => navigate(`${item.id}`)} />
              </div>
            ))
          : 'HAVING PROBLEMS '}
      </InfiniteScroll>
    </div>
  );
};

export default observer(Cards);
