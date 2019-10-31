import * as React from 'react';

import Button from '../Button';

import css from './CTAButton.scss';

interface Props {
  children?: string | React.ReactNode;
  className?: string;
  onClick?: Function;
}

const CTAButton: React.FunctionComponent<Props> = React.forwardRef(
  ({ children, className, ...restProps }, ref) => {
    return (
      <Button
        className={[css.ctaButton, className || ''].join(' ')}
        {...restProps}
        ref={ref}
      >
        {children}
      </Button>
    );
  },
);

export default CTAButton;
