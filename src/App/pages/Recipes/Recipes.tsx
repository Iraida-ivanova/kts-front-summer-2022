import React, { FormEvent, useCallback, useEffect } from 'react';

import { useRecipesContext } from '@App/App';
import Button from '@components/Button';
import Input from '@components/Input';
import Loader from '@components/Loader';
import MultiDropdown from '@components/MultiDropdown';
import SearchIcon from '@components/SearchIcon';
import RecipeCards from '@pages/Recipes/components/RecipeCards/RecipeCards';
import { Meta } from '@projectTypes/enums';
import { Option } from '@projectTypes/types';
import rootStore from '@store/RootStore';
import { options } from '@utils/options';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Router from 'react-router-dom';

import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const recipeListStore = useRecipesContext();
  const [qs, setQs] = Router.useSearchParams();

  useEffect(() => {
    setQs(rootStore.queryParams.params);
    const number = rootStore.query.getParam('offset') ?? 0;
    recipeListStore.getRecipeList(+number);
    return () => {
      rootStore.queryParams.setAllParams(rootStore.query.params as Record<string, string | string[]>);
    };
  }, []);

  const pluralizeOptions = useCallback((elements: Option[]) => {
    return elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';
  }, []);

  const handleChange = useCallback((value: string): void => {
    rootStore.queryParams.setParams('search', value);
    setQs(rootStore.queryParams.params);
  }, []);

  const handleSelect = useCallback(
    (value: Option[]) => {
      rootStore.queryParams.deleteParam('search');
      rootStore.queryParams.setParams('offset', '0');
      setQs(rootStore.queryParams.params);
      recipeListStore.multiDropdown.setSelectedValues(value);
    },
    [recipeListStore.multiDropdown]
  );

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    recipeListStore.multiDropdown.setSelectedValues([]);
    recipeListStore.multiDropdown.close();
    rootStore.queryParams.setParams('offset', '0');
    setQs(rootStore.queryParams.params);
  }, []);

  const getNextRecipes = useCallback(async () => {
    const offset = recipeListStore.list.length;
    rootStore.queryParams.setParams('offset', `${offset}`);
    setQs(rootStore.queryParams.params);
  }, [recipeListStore.list.length]);

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__header}>
        <form className={styles.recipes__search} onSubmit={handleSubmit}>
          <Input
            placeholder={'Search'}
            value={(rootStore.query.getParam('search') as string) || ''}
            onChange={handleChange}
          />
          <Button className={styles.recipes__searchBtn} disabled={recipeListStore.meta === Meta.loading}>
            <SearchIcon />
          </Button>
        </form>
        <div className={styles.multiDropdownWrapper}>
          <MultiDropdown
            options={options}
            pluralizeOptions={pluralizeOptions}
            value={recipeListStore.multiDropdown.selectedValues}
            onChange={handleSelect}
            disabled={recipeListStore.meta === Meta.loading}
          />
        </div>
      </div>
      <div>
        {recipeListStore.meta === Meta.error ? (
          <div>LOADING HAVING PROBLEM...</div>
        ) : (
          <InfiniteScroll
            dataLength={recipeListStore.list.length}
            next={getNextRecipes}
            hasMore={recipeListStore.hasMore}
            loader={<Loader />}
            style={{ overflow: 'hidden' }}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <RecipeCards items={recipeListStore.list} />
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};

export default observer(Recipes);
