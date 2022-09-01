import React from 'react';

import Button from '@components/Button';
import Likes from '@components/Likes';
import { ButtonColor } from '@projectTypes/enums';
import { RecipeCard } from '@projectTypes/types';

import styles from './Card.module.scss';

type CardProps = {
  item: RecipeCard;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <Likes likes={item.likes} className={styles.card__likes} />
      <img className={styles.card__image} src={item.image} alt={`${item.title}`} />
      <h2 className={styles.card__title}>{item.title}</h2>
      <div className={styles.card__category}>{item.types}</div>
      <div className={styles.card__subtitle}>{item.subtitle}</div>
      <div className={styles.card__content}>
        <div className={styles.card__contentLeft}>{item.content}</div>
        <Button color={ButtonColor.primary} className={styles.card__button_form_rectangle}>
          Order
        </Button>
        <Button color={ButtonColor.primary} className={styles.card__button_form_round}>
          +
        </Button>
      </div>
    </div>
  );
};

export default Card;
