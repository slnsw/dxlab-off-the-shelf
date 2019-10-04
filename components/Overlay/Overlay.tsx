import * as React from 'react';

import css from './Overlay.scss';

type Props = {
  isActive?: boolean;
  className?: string;
  onClick?: Function;
};

const Overlay: React.FunctionComponent<Props> = ({
  isActive,
  className,
  onClick,
}) => {
  if (!isActive) {
    return null;
  }

  return (
    <div
      className={[css.overlay, className || ''].join(' ')}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}
    />
  );
};

export default Overlay;
