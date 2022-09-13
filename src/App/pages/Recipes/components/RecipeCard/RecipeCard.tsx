import React from 'react';

import Button from 'components/Button';
import Likes from 'components/Likes';
import { ButtonColor } from 'projectTypes/enums';
import { RecipeItemModel } from 'store/models/Food/recipeItem';
import { getStringOfIngredients } from 'utils/utils';

import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
  item: RecipeItemModel;
  onClick?: React.MouseEventHandler;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ item, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <Likes likes={item.likes} className={styles.card__likes} />
      <img className={styles.card__image} src={item.image} alt={`${item.title}`} />
      <h2 className={styles.card__title}>{item.title}</h2>
      <div className={styles.card__category}>{item.dishTypes.join(', ')}</div>
      <div className={styles.card__subtitle}>{item.ingredients && getStringOfIngredients(item.ingredients)}</div>
      <div className={styles.card__content}>
        <div className={styles.card__calories}>{item.calories}</div>
        <Button color={ButtonColor.primary} className={styles.card__button_rectangle}>
          Order
        </Button>
        <Button color={ButtonColor.primary} className={styles.card__button_round}>
          +
        </Button>
      </div>
    </div>
  );
};

export default React.memo(RecipeCard);
