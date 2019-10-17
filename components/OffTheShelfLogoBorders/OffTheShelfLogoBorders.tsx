import * as React from 'react';

import OffTheShelfLogoBorder from '../OffTheShelfLogoBorder';

import css from './OffTheShelfLogoBorders.scss';

type Props = {
  strokeWidth?: number;
  className?: string;
};

const OffTheShelfLogoBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 10,
  className,
}) => {
  return (
    <div
      className={[css.offTheShelfLogoBorders, className || ''].join(' ')}
      style={{
        marginTop: strokeWidth * 1.5 * 2,
      }}
    >
      <OffTheShelfLogoBorder
        index={0}
        strokeWidth={strokeWidth}
        colour="white"
      ></OffTheShelfLogoBorder>
      <OffTheShelfLogoBorder
        index={1}
        strokeWidth={strokeWidth}
        colour="yellow"
      ></OffTheShelfLogoBorder>
      <OffTheShelfLogoBorder
        index={2}
        strokeWidth={strokeWidth}
        colour="teal"
      ></OffTheShelfLogoBorder>
    </div>
  );
};

export default OffTheShelfLogoBorders;
