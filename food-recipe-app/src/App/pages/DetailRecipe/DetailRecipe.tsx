import React, { useEffect } from 'react';

import Button from '@components/Button';
import Likes from '@components/Likes';
import ReturnIcon from '@components/ReturnIcon';
import WithLoader from '@components/WithLoader';
import { LoaderSize, Meta } from '@projectTypes/enums';
import DetailRecipeStore from '@store/DetailRecipeStore';
import { IIngredientApi } from '@store/models/Food/Ingridient';
import { useLocalStore } from '@utils/UseLocalStore';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';

import styles from './DetailRecipe.module.scss';

const DetailRecipe: React.FC = () => {
  const { id } = useParams();
  const detailRecipeStore = useLocalStore<DetailRecipeStore>(() => new DetailRecipeStore(id));
  useEffect(() => {
    detailRecipeStore.getDetailRecipe();
  }, [detailRecipeStore.id]);
  return (
    <div className={styles.detailRecipe}>
      <Link to="/">
        <Button className={styles.detailRecipe__btnReturn}>
          <ReturnIcon />
        </Button>
      </Link>
      <WithLoader loading={detailRecipeStore.meta === Meta.loading} size={LoaderSize.l}>
        {detailRecipeStore.meta === Meta.success && detailRecipeStore.item && (
          <>
            <img
              className={styles.detailRecipe__image}
              src={detailRecipeStore.item.image}
              alt={`${detailRecipeStore.item.title}`}
            />
            <div className={styles.detailRecipe__wrapper}>
              <div className={styles.detailRecipe__scroll}></div>
              <div className={styles.detailRecipe__content}>
                <h1 className={styles.detailRecipe__title}>{detailRecipeStore.item.title}</h1>
                <Likes likes={detailRecipeStore.item.likes} className={styles.detailRecipe__likes} />
                <div className={styles.detailRecipe__category}>{detailRecipeStore.item.dishTypes.join(', ')}</div>
                <div className={styles.detailRecipe__time}>
                  Сooking time: {detailRecipeStore.item.readyInMinutes} minutes
                </div>
                <div
                  className={styles.detailRecipe__summary}
                  dangerouslySetInnerHTML={{ __html: detailRecipeStore.item.summary }}
                ></div>
                <div className={styles.detailRecipe__ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {detailRecipeStore.item.ingredients.map((product: IIngredientApi) => (
                      <li key={product.id + product.name}>{product.name}</li>
                    ))}
                  </ul>
                </div>
                {detailRecipeStore.item.instructions && (
                  <div className={styles.detailRecipe__instructions}>
                    <h3>Instructions</h3>
                    <div dangerouslySetInnerHTML={{ __html: detailRecipeStore.item.instructions }}></div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </WithLoader>
    </div>
  );
};
export default observer(DetailRecipe);
