import React from 'react';

import RecipeCard from 'pages/Recipes/components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { RecipeItemModel } from 'store/models/Food/recipeItem';

import styles from './RecipeCards.module.scss';

type RecipeCardsProps = {
  items: RecipeItemModel[];
};
const RecipeCards: React.FC<RecipeCardsProps> = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.recipeCards}>
      {items.map((item) => (
        <div key={item.id} className={styles.recipeCards__item}>
          <RecipeCard item={item} onClick={() => navigate(`recipe/${item.id}`)} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(RecipeCards);
