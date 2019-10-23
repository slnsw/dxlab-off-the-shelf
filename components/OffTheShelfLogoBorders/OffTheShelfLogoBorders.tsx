import * as React from 'react';

import OffTheShelfLogoBorder from '../OffTheShelfLogoBorder';

import css from './OffTheShelfLogoBorders.scss';

type Props = {
  strokeWidth?: number;
  orientation?: 'bottomLeft' | 'topRight';
  isHidden?: boolean;
  className?: string;
};

const OffTheShelfLogoBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 10,
  orientation = 'bottomLeft',
  isHidden = false,
  className,
}) => {
  const indexes = {
    bottomLeft: [0, 1, 2],
    topRight: [2, 1, 0],
  };

  return (
    <div
      className={[css.offTheShelfLogoBorders, className || ''].join(' ')}
      style={{
        top: strokeWidth * 1.5 * 2,
        // marginTop: strokeWidth * 1.5 * 2,
      }}
    >
      <OffTheShelfLogoBorder
        index={indexes[orientation][0]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="white"
        isHidden={isHidden}
      />
      <OffTheShelfLogoBorder
        index={indexes[orientation][1]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="yellow"
        isHidden={isHidden}
      />
      <OffTheShelfLogoBorder
        index={indexes[orientation][2]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="teal"
        isHidden={isHidden}
      />
    </div>
  );
};

export default OffTheShelfLogoBorders;
