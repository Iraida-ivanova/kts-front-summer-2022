import React from 'react';

import RecipeCard from '@pages/Recipes/components/RecipeCard';
import { RecipeItemModel } from '@store/models/Food/RecipeItem';
import { useNavigate } from 'react-router-dom';

import styles from './RecipeCards.module.scss';

type RecipeCardsProps = {
  items: RecipeItemModel[];
};
const RecipeCards: React.FC<RecipeCardsProps> = ({ items }) => {
  let navigate = useNavigate();

  return (
    <div className={styles.recipeCards}>
      {items.map((item) => (
        <div key={item.id} className={styles.recipeCards__item}>
          <RecipeCard item={item} onClick={() => navigate(`${item.id}`)} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(RecipeCards);
