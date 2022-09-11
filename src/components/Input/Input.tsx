import React from 'react';

import classNames from 'classnames';

import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

const Input: React.FC<InputProps> = ({ value, onChange, className, ...props }) => {
  const inputClass = classNames(styles.input, {
    [styles.input_disabled]: props.disabled,
    [`${styles[`${className}`]}`]: className,
  });
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} {...props} />
  );
};

export default React.memo(Input);
