import React from 'react';

import classNames from 'classnames';

import styles from './Checkbox.module.scss';

type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  const checkBoxClassName = classNames(styles.checkbox, {
    [`${styles.checkbox_disabled}`]: props.disabled,
    [`${styles[`${props.className}`]}`]: props.className,
  });
  return (
    <>
      <input
        type="checkbox"
        id="checkbox"
        onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
        {...props}
        className={checkBoxClassName}
      />
      <label htmlFor="checkbox"></label>
    </>
  );
};

export default CheckBox;
