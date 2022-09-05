import React, { useCallback, useEffect, useState } from 'react';

import { useRecipesContext } from '@App/App';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Cards from '@pages/Recipes/components/Cards';
import { Option } from '@projectTypes/types';
import { options } from '@utils/options';
import { observer } from 'mobx-react-lite';

import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const [value, setValue] = useState('');
  const recipeListStore = useRecipesContext();
  useEffect(() => {
    recipeListStore.getRecipeList();
  }, [recipeListStore.selectedValues.values]);
  const pluralizeOptions = useCallback((elements: Option[]) => {
    return elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';
  }, []);
  const handleChange = useCallback((value: string): void => {
    setValue(value);
  }, []);
  const handleSelect = useCallback(
    (value: Option[]) => {
      recipeListStore.selectedValues.setSelectedValues(value);
      recipeListStore.setOffset(0);
    },
    [recipeListStore.selectedValues, recipeListStore.setOffset]
  );

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__header}>
        <Input placeholder={'Search'} value={value} onChange={handleChange} />
        <div className={styles.multiDropdownWrapper}>
          <MultiDropdown
            options={options}
            pluralizeOptions={pluralizeOptions}
            value={recipeListStore.selectedValues.values}
            onChange={handleSelect}
          />
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default observer(Recipes);
