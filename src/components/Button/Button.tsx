import React from 'react';

import classNames from 'classnames';
import Loader from 'components/Loader';
import { ButtonColor, LoaderSize } from 'projectTypes/enums';

import styles from './Button.module.scss';

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ loading, color = ButtonColor.primary, children, className, ...rest }) => {
  const isDisabled = rest.disabled || loading;
  const buttonClass = classNames(`${styles.button}`, {
    [`${styles[`button_color-${color}`]}`]: true,
    [styles.button_disabled]: isDisabled,
    [`${className}`]: className,
  });

  return (
    <button onClick={rest.onClick} className={buttonClass} disabled={isDisabled} {...rest}>
      {children}
      {loading && <Loader size={LoaderSize.s} className={styles.loader_inButton} />}
    </button>
  );
};

export default Button;
