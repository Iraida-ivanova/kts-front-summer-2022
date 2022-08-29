import React from 'react';

import { useRecipesContext } from '@App/App';
import Input from '@components/Input';
import MultiDropdown from '@components/MultiDropdown';
import Cards from '@pages/Recipes/components/Cards';
import { Option } from '@projectTypes/types';
import { options } from '@utils/options';

import styles from './Recipes.module.scss';

const Recipes: React.FC = () => {
  const [value, setValue] = React.useState('');
  const { pickedValues, setPickedValues } = useRecipesContext();
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
