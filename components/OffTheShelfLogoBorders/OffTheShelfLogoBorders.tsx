import * as React from 'react';

import OffTheShelfLogoBorder from '../OffTheShelfLogoBorder';

import css from './OffTheShelfLogoBorders.scss';

type Props = {
  strokeWidth?: number;
  orientation?: 'bottomLeft' | 'topRight';
  className?: string;
};

const OffTheShelfLogoBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 10,
  orientation = 'bottomLeft',
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
        marginTop: strokeWidth * 1.5 * 2,
      }}
    >
      <OffTheShelfLogoBorder
        index={indexes[orientation][0]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="white"
      ></OffTheShelfLogoBorder>
      <OffTheShelfLogoBorder
        index={indexes[orientation][1]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="yellow"
      ></OffTheShelfLogoBorder>
      <OffTheShelfLogoBorder
        index={indexes[orientation][2]}
        strokeWidth={strokeWidth}
        orientation={orientation}
        colour="teal"
      ></OffTheShelfLogoBorder>
    </div>
  );
};

export default OffTheShelfLogoBorders;
