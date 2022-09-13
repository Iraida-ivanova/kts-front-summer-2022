import React from 'react';

import { LoaderSize } from 'projectTypes/enums';

import styles from './Loader.module.scss';

const classNames = require('classnames');

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ loading = true, size = LoaderSize.m, className }) => {
  const loaderClass = classNames(`${styles.loader}`, {
    [`${className}`]: className,
    [`${styles[`loader_size-${size}`]}`]: size,
  });

  return loading ? <div className={loaderClass}></div> : null;
};

export default Loader;
