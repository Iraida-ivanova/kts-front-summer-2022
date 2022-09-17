import React from 'react';

import Button from 'components/Button';
import { Option } from 'projectTypes/types';

import styles from './Category.module.scss';

type CategoryProps = {
  option: Option;
  onClick: (value: Option) => void;
};

const Category: React.FC<CategoryProps> = ({ option, onClick }) => {
  return (
    <div className={styles.category}>
      <div>{option.value}</div>
      <Button onClick={() => onClick(option)} className={styles.category__removeBtn}>
        ✕
      </Button>
    </div>
  );
};

export default React.memo(Category);
