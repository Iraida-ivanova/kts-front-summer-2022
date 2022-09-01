import React, { useEffect } from 'react';

import { useRecipesContext } from '@App/App';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Cards from '@pages/Recipes/components/Cards';
import { Option } from '@projectTypes/types';
import { options } from '@utils/options';
import { getStringOfTypes } from '@utils/utils';

import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const [value, setValue] = React.useState('');
  const { pickedValues, setPickedValues, getRecipes } = useRecipesContext();

  useEffect(() => {
    pickedValues.length ? getRecipes(0, getStringOfTypes(pickedValues)) : getRecipes(0);
  }, [pickedValues]);

  const pluralizeOptions = (elements: Option[]) =>
    elements.length ? elements.map((el: Option) => el.value).join(', ') : 'Pick categories';

  const handleChange = (value: string): void => {
    setValue(value);
  };

  const handleSelect = (value: Option[]) => {
    setPickedValues(value);
  };

  return (
    <div className={styles.recipes}>
      <div className={styles.recipes__header}>
        <Input placeholder={'Search'} value={value} onChange={handleChange} />
        <div className={styles.multiDropdownWrapper}>
          <MultiDropdown
            options={options}
            pluralizeOptions={pluralizeOptions}
            value={pickedValues}
            onChange={handleSelect}
          />
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default Recipes;
