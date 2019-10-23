import * as React from 'react';

import OffTheShelfLogoBorder from '../OffTheShelfLogoBorder';

import css from './OffTheShelfLogoBorders.scss';

type Props = {
  strokeWidth?: number;
  orientation?: 'bottomLeft' | 'topRight';
  isActive?: boolean;
  className?: string;
};

const OffTheShelfLogoBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 10,
  orientation = 'bottomLeft',
  isActive = false,
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
        isActive={isActive}
      />
      <OffTheShelfLogoBorder
        index={indexes[orientation][1]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="yellow"
        isActive={isActive}
      />
      <OffTheShelfLogoBorder
        index={indexes[orientation][2]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="teal"
        isActive={isActive}
      />
    </div>
  );
};

export default OffTheShelfLogoBorders;
