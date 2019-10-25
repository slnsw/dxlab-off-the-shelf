import * as React from 'react';

import Button from '../Button';

import css from './CTAButton.scss';

interface Props {
  children?: string | React.ReactNode;
  className?: string;
  onClick?: Function;
}

const CTAButton: React.FunctionComponent<Props> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <Button
      className={[css.ctaButton, className || ''].join(' ')}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export default CTAButton;
