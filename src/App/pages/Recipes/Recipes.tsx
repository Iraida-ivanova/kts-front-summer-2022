import React, { createContext, FormEvent, useCallback, useContext, useEffect } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown from 'components/MultiDropdown';
import SearchIcon from 'components/SearchIcon';
import { observer } from 'mobx-react-lite';
import RecipeCards from 'pages/Recipes/components/RecipeCards/RecipeCards';
import { Option } from 'projectTypes/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Router from 'react-router-dom';
import RecipeListStore from 'store/RecipeListStore';
import rootStore from 'store/RootStore';
import { numberOfItems } from 'utils/numberOfItems';
import { options } from 'utils/options';
import { useLocalStore } from 'utils/useLocalStore';

import styles from './Recipes.module.scss';

const RecipesContext = createContext<RecipeListStore>(new RecipeListStore());
export const useRecipesContext = () => useContext(RecipesContext);

const Recipes: React.FC = () => {
  const recipeListStore = useLocalStore(() => new RecipeListStore());
  const [, setQs] = Router.useSearchParams();

  const upDateQs = (): void => setQs(rootStore.query.duplicateParams);

  useEffect(() => {
    if (rootStore.query.queryString) {
      rootStore.query.setDuplicateParams(rootStore.query.params as Record<string, string | string[]>);
    }
    const number = rootStore.query.getDuplicateParam('offset') ?? '0';
    upDateQs();
    recipeListStore.getRecipeList(+number + numberOfItems);
  }, []);

  const pluralizeOptions = useCallback((elements: Option[]) => {
    return elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';
  }, []);

  const handleChange = useCallback(
    (value: string): void => {
      rootStore.query.setDuplicateParam('search', value);
      upDateQs();
    },
    [setQs]
  );

  const handleSelect = useCallback(
    async (value: Option[]) => {
      rootStore.query.deleteDuplicateParam('search');
      rootStore.query.setDuplicateParam('offset', '0');
      await upDateQs();
      recipeListStore.multiDropdownStore.setSelectedValues(value);
    },
    [recipeListStore.multiDropdownStore.setSelectedValues, rootStore.query.setDuplicateParam, setQs]
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      recipeListStore.multiDropdownStore.setSelectedValues([]);
      recipeListStore.multiDropdownStore.close();
      rootStore.query.setDuplicateParam('offset', '0');
      upDateQs();
    },
    [recipeListStore.multiDropdownStore.setSelectedValues, recipeListStore.multiDropdownStore.close, setQs]
  );

  const getNextRecipes = useCallback(async () => {
    const offset = recipeListStore.list.length;
    rootStore.query.setDuplicateParam('offset', `${offset}`);
    upDateQs();
    recipeListStore.getRecipeList();
  }, []);

  return (
    <RecipesContext.Provider value={recipeListStore}>
      <div className={styles.recipes}>
        <div className={styles.recipes__header}>
          <form className={styles.recipes__search} onSubmit={handleSubmit}>
            <Input
              placeholder={'Search'}
              value={(rootStore.query.getParam('search') as string) || ''}
              onChange={handleChange}
            />
            <Button className={styles.recipes__searchBtn} disabled={recipeListStore.loading}>
              <SearchIcon />
            </Button>
          </form>
          <div className={styles.multiDropdownWrapper}>
            <MultiDropdown
              options={options}
              pluralizeOptions={pluralizeOptions}
              value={recipeListStore.multiDropdownStore.selectedValues}
              onChange={handleSelect}
              disabled={recipeListStore.loading}
            />
          </div>
        </div>
        <div>
          {recipeListStore.hasError ? (
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
    </RecipesContext.Provider>
  );
};

export default observer(Recipes);
