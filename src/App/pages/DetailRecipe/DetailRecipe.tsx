import React, { useEffect } from 'react';

import Button from 'components/Button';
import Likes from 'components/Likes';
import ReturnIcon from 'components/ReturnIcon';
import WithLoader from 'components/WithLoader';
import { observer } from 'mobx-react-lite';
import { LoaderSize } from 'projectTypes/enums';
import { Link, useParams } from 'react-router-dom';
import DetailRecipeStore from 'store/DetailRecipeStore';
import { IIngredientApi } from 'store/models/Food/ingridient';
import { useLocalStore } from 'utils/useLocalStore';

import styles from './DetailRecipe.module.scss';

const DetailRecipe: React.FC = () => {
  const { recipeId } = useParams();
  const { id, item, loading, hasSuccess, getDetailRecipe } = useLocalStore<DetailRecipeStore>(
    () => new DetailRecipeStore(recipeId)
  );

  useEffect(() => {
    getDetailRecipe();
  }, [id]);

  return (
    <div className={styles.detailRecipe}>
      <Link to="/">
        <Button className={styles.detailRecipe__btnReturn}>
          <ReturnIcon />
        </Button>
      </Link>
      <WithLoader loading={loading} size={LoaderSize.l}>
        {hasSuccess && item && (
          <>
            <img className={styles.detailRecipe__image} src={item.image} alt={`${item.title}`} />
            <div className={styles.detailRecipe__wrapper}>
              <div className={styles.detailRecipe__scroll}></div>
              <div className={styles.detailRecipe__content}>
                <h1 className={styles.detailRecipe__title}>{item.title}</h1>
                <Likes likes={item.likes} className={styles.detailRecipe__likes} />
                <div className={styles.detailRecipe__category}>{item.dishTypes.join(', ')}</div>
                <div className={styles.detailRecipe__time}>Сooking time: {item.readyInMinutes} minutes</div>
                <div className={styles.detailRecipe__summary} dangerouslySetInnerHTML={{ __html: item.summary }}></div>
                <div className={styles.detailRecipe__ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {item.ingredients.map((product: IIngredientApi) => (
                      <li key={product.id + product.name}>{product.name}</li>
                    ))}
                  </ul>
                </div>
                {item.instructions && (
                  <div className={styles.detailRecipe__instructions}>
                    <h3>Instructions</h3>
                    <div dangerouslySetInnerHTML={{ __html: item.instructions }}></div>
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
