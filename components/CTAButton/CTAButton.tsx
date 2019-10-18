import * as React from 'react';

import Button from '../Button';

import css from './CTAButton.scss';

type Props = {
  children?: string | React.ReactNode;
  className?: string;
};

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
