import React from 'react';

import classNames from 'classnames';
import { Option } from 'projectTypes/types';

import styles from './OptionComponent.module.scss';

export type OptionProps = {
  option: Option;
  selected: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

const OptionComponent: React.FC<OptionProps> = ({ option, selected, onClick }) => {
  const optionClassName = classNames(`${styles.multiDropdown__option}`, {
    [styles.multiDropdown__option_selected]: selected,
  });

  return (
    <div className={optionClassName} id={option.key} onClick={onClick}>
      {option.value}
    </div>
  );
};

export default React.memo(OptionComponent);
