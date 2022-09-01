import React, { useEffect, useState } from 'react';

import Button from '@components/Button';
import Likes from '@components/Likes';
import ReturnIcon from '@components/ReturnIcon';
import WithLoader from '@components/WithLoader';
import { LoaderSize } from '@projectTypes/enums';
import { RecipeItem } from '@projectTypes/types';
import { apiKey } from '@utils/apiKey';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import styles from './DetailRecipe.module.scss';

const DetailRecipe: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [recipe, setRecipe] = useState<null | RecipeItem>(null);
  useEffect(() => {
    async function getRecipe(): Promise<void> {
      setIsLoading(true);
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      });

      if (result.status !== 200) {
        throw new Error(result.statusText);
      }
      setIsLoading(false);
      setRecipe({
        id: result.data.id,
        image: result.data.image,
        title: result.data.title,
        likes: result.data.aggregateLikes,
        readyInMinutes: result.data.readyInMinutes,
        ingredients: result.data.extendedIngredients.map(
          (item: Record<string, string | number | Array<string> | Record<string, Record<string, string | number>>>) =>
            item.name
        ),
        summary: result.data.summary,
        instructions: result.data.instructions,
        dishTypes: result.data.dishTypes,
      });
    }
    getRecipe();
  }, [id]);
  return (
    <div className={styles.detailRecipe}>
      <Link to="/">
        <Button className={styles.detailRecipe__btnReturn}>
          <ReturnIcon />
        </Button>
      </Link>
      <WithLoader loading={isLoading} size={LoaderSize.l}>
        {recipe && (
          <>
            <img className={styles.detailRecipe__image} src={recipe.image} alt={`${recipe.title}`} />
            <div className={styles.detailRecipe__wrapper}>
              <div className={styles.detailRecipe__scroll}></div>
              <div className={styles.detailRecipe__content}>
                <h1 className={styles.detailRecipe__title}>{recipe.title}</h1>
                <Likes likes={recipe.likes} className={styles.detailRecipe__likes} />
                <div className={styles.detailRecipe__category}>{recipe.dishTypes.join(', ')}</div>
                <div className={styles.detailRecipe__time}>Сooking time: {recipe.readyInMinutes} minutes</div>
                <div
                  className={styles.detailRecipe__summary}
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                ></div>
                <div className={styles.detailRecipe__ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipe.ingredients.map((product: string) => (
                      <li key={`${product}${recipe.title}`}>{product}</li>
                    ))}
                  </ul>
                </div>
                {recipe.instructions && (
                  <div className={styles.detailRecipe__instructions}>
                    <h3>Instructions</h3>
                    <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
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
export default DetailRecipe;
