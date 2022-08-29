import React from 'react';

import { useRecipesContext } from '@App/App';
import Loader from '@components/Loader';
import Card from '@pages/Recipes/components/Card';
import { getStringOfTypes } from '@utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import styles from './Cards.module.scss';
const Cards: React.FC = () => {
  let navigate = useNavigate();
  const { items, getRecipes, hasMore, pickedValues } = useRecipesContext();

  async function getNextRecipes() {
    const offset = items.length;
    await getRecipes(offset, getStringOfTypes(pickedValues));
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={getNextRecipes}
        hasMore={hasMore}
        loader={<Loader />}
        className={styles.cards}
        style={{ overflow: 'hidden' }}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item) => (
          <div key={item.id} className={styles.cards__item}>
            <Card item={item} onClick={() => navigate(`${item.id}`)} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Cards;
