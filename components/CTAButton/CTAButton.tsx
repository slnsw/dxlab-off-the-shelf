import * as React from 'react';

import Button from '../Button';

import css from './CTAButton.scss';

interface Props {
  size?: 'sm' | 'md';
  children?: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: Function;
}

const CTAButton: React.FunctionComponent<Props> = React.forwardRef(
  ({ size = 'md', children, disabled, className, ...restProps }, ref) => {
    return (
      <Button
        className={[
          css.ctaButton,
          className || '',
          /* eslint-disable */
          size === 'sm' ? css.sm : '',
          /* eslint-enable */
        ].join(' ')}
        {...restProps}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

export default CTAButton;
