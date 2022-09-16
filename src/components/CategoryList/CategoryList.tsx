import React from 'react';

import Category from 'components/Category';
import { Option } from 'projectTypes/types';

import styles from './CategoryList.module.scss';

type CategoryListProps = {
  options: Option[];
  onClick: (value: Option) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ options, onClick }) => {
  return (
    <div className={styles.categoryList}>
      {options.map((item) => (
        <React.Fragment key={item.key}>
          <Category option={item} onClick={onClick} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default React.memo(CategoryList);
