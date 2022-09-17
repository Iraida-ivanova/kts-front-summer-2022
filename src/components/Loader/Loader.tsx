import React from 'react';

import { LoaderSize } from 'projectTypes/enums';

import styles from './Loader.module.scss';

const classNames = require('classnames');

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
  onScreen?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading = true, size = LoaderSize.m, className, onScreen }) => {
  const loaderClass = classNames(`${styles.loader}`, {
    [styles[`loader_size-${size}`]]: size,
  });

  const loaderWrapperClass = classNames(`${styles.mask}`, {
    [styles[`${className}`]]: className,
    [styles.loader_onScreen]: onScreen,
  });

  return loading ? (
    <div className={loaderWrapperClass}>
      <div className={loaderClass}></div>
    </div>
  ) : null;
};

export default Loader;
