import React, { createContext, FormEvent, useCallback, useContext, useEffect } from 'react';

import Button from 'components/Button';
import CategoryList from 'components/CategoryList';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown from 'components/MultiDropdown';
import SearchIcon from 'components/SearchIcon';
import { observer } from 'mobx-react-lite';
import RecipeCards from 'pages/Recipes/components/RecipeCards/RecipeCards';
import { LoaderSize } from 'projectTypes/enums';
import { Option } from 'projectTypes/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as Router from 'react-router-dom';
import RecipeListStore from 'store/RecipeListStore';
import rootStore from 'store/RootStore';
import { numberOfItems } from 'utils/numberOfItems';
import { options } from 'utils/options';
import { useLocalStore } from 'utils/useLocalStore';
import { getTypes } from 'utils/utils';

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

    recipeListStore.input.setValue(rootStore.query.getDuplicateParam('search') as string);

    if (rootStore.query.getDuplicateParam('type')) {
      recipeListStore.multiDropdownStore.setSelectedValues(
        options.filter((item) => (rootStore.query.getDuplicateParam('type') as string).includes(item.key))
      );
    }
    upDateQs();

    const number = rootStore.query.getDuplicateParam('offset') ?? '0';
    recipeListStore.getRecipeList(0, +number + numberOfItems);
  }, []);

  const pluralizeOptions = useCallback((elements: Option[]) => {
    return elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';
  }, []);

  const handleChange = useCallback(
    (value: string): void => {
      recipeListStore.input.setValue(value);
    },
    [setQs]
  );

  const handleSelect = useCallback(
    async (value: Option[]) => {
      recipeListStore.multiDropdownStore.setSelectedValues(value);

      rootStore.query.setDuplicateParam('offset', '0');
      rootStore.query.setDuplicateParam('type', getTypes(recipeListStore.multiDropdownStore.selectedValues));
      await upDateQs();
    },
    [recipeListStore.multiDropdownStore.setSelectedValues, rootStore.query.setDuplicateParam, setQs]
  );

  const handleRemoveBtn = useCallback((value: Option): void => {
    recipeListStore.multiDropdownStore.deleteFromSelectedValues(value);
    rootStore.query.setDuplicateParam('type', getTypes(recipeListStore.multiDropdownStore.selectedValues));
    rootStore.query.setDuplicateParam('offset', '0');
    upDateQs();
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      rootStore.query.setDuplicateParam('offset', '0');
      rootStore.query.setDuplicateParam('search', recipeListStore.input.value);
      upDateQs();

      recipeListStore.getRecipeList(0);
    },
    [recipeListStore.multiDropdownStore.setSelectedValues, recipeListStore.multiDropdownStore.close, setQs]
  );

  const getNextRecipes = useCallback(async () => {
    const offset = recipeListStore.list.length;
    rootStore.query.setDuplicateParam('offset', `${offset}`);
    upDateQs();
    recipeListStore.getRecipeList(offset);
  }, []);

  return (
    <RecipesContext.Provider value={recipeListStore}>
      <div className={styles.recipes}>
        <div className={styles.recipes__header}>
          <form className={styles.recipes__search} onSubmit={handleSubmit}>
            <Input
              placeholder={'Search'}
              value={recipeListStore.input.value ?? ''}
              onChange={handleChange}
              disabled={recipeListStore.loading}
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
        {recipeListStore.multiDropdownStore.selectedValues.length > 0 && (
          <CategoryList options={recipeListStore.multiDropdownStore.selectedValues} onClick={handleRemoveBtn} />
        )}
        <div>
          {recipeListStore.hasError ? (
            <div>LOADING HAVING PROBLEM...</div>
          ) : (
            <div>
              {rootStore.query.getParam('search') !== '' && recipeListStore.hasSuccess && (
                <div className={styles.recipes__message}>
                  {rootStore.query.getParam('search') &&
                    (recipeListStore.list.length
                      ? `SHOWING RESULTS FOR "${rootStore.query.getParam('search')}"`
                      : `NO MATCHING RECIPES FOR "${rootStore.query.getParam('search')}"`)}
                </div>
              )}
              <InfiniteScroll
                dataLength={recipeListStore.list.length}
                next={getNextRecipes}
                hasMore={recipeListStore.hasMore}
                loader={<Loader size={LoaderSize.l} onScreen={true} />}
                style={{ overflow: 'hidden' }}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>
                      {recipeListStore.list.length > 0 &&
                        `SHOWING ${recipeListStore.list.length} of ${recipeListStore.list.length} recipes`}
                    </b>
                  </p>
                }
              >
                <RecipeCards items={recipeListStore.list} />
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
    </RecipesContext.Provider>
  );
};

export default observer(Recipes);
