// @ts-nocheck
import * as React from 'react';

import css from './Button.module.scss';

/* eslint css-modules/no-unused-class: [2, { markAsUsed: ['sm'] }] */

export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children: string | React.ReactNode;
  onClick?: Function;
}

// React.forwardRef added because of:
// Warning: Function components cannot be given refs. Attempts to access
// this ref will fail. Did you mean to use React.forwardRef()? Check the
// render method of `Link`.
// https://github.com/zeit/next.js/issues/7915
const Button: React.FunctionComponent<ButtonProps> = React.forwardRef(
  (
    { size = 'md', disabled = false, children, className, ...restProps },
    ref,
  ) => {
    return (
      <button
        className={[
          css.button,
          size !== 'md' ? css[size] : '',
          className || '',
        ].join(' ')}
        disabled={disabled}
        {...restProps}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default Button;
