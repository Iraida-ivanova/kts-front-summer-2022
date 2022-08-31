import React, { useEffect, useState } from 'react';

import { useRecipesContext } from '@App/App';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import WithLoader from '@components/WithLoader';
import Cards from '@pages/Recipes/components/Cards';
import { LoaderSize, Meta } from '@projectTypes/enums';
import { Option } from '@projectTypes/types';
import { options } from '@utils/options';
import { observer } from 'mobx-react-lite';

import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const [value, setValue] = useState('');
  const recipeListStore = useRecipesContext();
  useEffect(() => {
    recipeListStore.getRecipeList();
  }, [recipeListStore.values.selectedValues]);
  const pluralizeOptions = (elements: Option[]) =>
    elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';
  const handleChange = (value: string): void => {
    setValue(value);
  };
  const handleSelect = (value: Option[]) => {
    recipeListStore.values.setSelectedValues(value);
    recipeListStore.setOffset(0);
  };

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__header}>
        <Input placeholder={'Search'} value={value} onChange={handleChange} />
        <div className={styles.multiDropdownWrapper}>
          <MultiDropdown
            options={options}
            pluralizeOptions={pluralizeOptions}
            value={recipeListStore.values.selectedValues}
            onChange={handleSelect}
          />
        </div>
      </div>
      <WithLoader loading={recipeListStore.meta === Meta.loading} size={LoaderSize.l}>
        <Cards />
      </WithLoader>
    </div>
  );
};

export default observer(Recipes);
