import React, { useCallback } from 'react';

import { useRecipesContext } from '@App/App';
import OptionComponent from '@components/OptionComponent';
import { Option } from '@projectTypes/types';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import styles from './MultiDropdown.module.scss';

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, disabled, pluralizeOptions, value, onChange }) => {
  const recipeListStore = useRecipesContext();
  const multiDropdownClassName = classNames(`${styles.multiDropdown}`, {
    [`${styles.multiDropdown_disabled}`]: disabled,
  });
  const selectClassName = classNames(`${styles.multiDropdown__select}`, {
    [`${styles.multiDropdown__select_little}`]: value.length > 1,
    [`${styles.multiDropdown__select_many}`]: value.length > 4,
  });

  const onSelectValue = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        const target = event.target as HTMLDivElement;
        const ind = value.findIndex((item) => item.key === target.id);

        if (ind === -1) {
          onChange([...value, { key: target.id, value: target.innerHTML }]);
        } else {
          const newValue = [...value];
          newValue.splice(ind, 1);
          onChange(newValue);
        }
      }
    },
    [value, onChange, disabled]
  );

  return (
    <div className={multiDropdownClassName}>
      <div
        className={selectClassName}
        onClick={() => {
          if (!disabled) recipeListStore.multiDropdown.changeIsOpened();
        }}
      >
        {pluralizeOptions(value)}
      </div>
      <div className={styles.multiDropdown__options}>
        {recipeListStore.multiDropdown.isOpened &&
          options.map((item) => {
            return (
              <React.Fragment key={item.key}>
                <OptionComponent
                  option={item}
                  selected={value.findIndex((opt) => opt.key === item.key) !== -1}
                  onClick={onSelectValue}
                />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(observer(MultiDropdown));
