import * as React from 'react';

import OffTheShelfLogoBorder from '../OffTheShelfLogoBorder';

import css from './OffTheShelfLogoBorders.scss';

type Props = {
  strokeWidth?: number;
  orientation?: 'bottomLeft' | 'topRight';
  isActive?: boolean;
  hasStartCorners?: boolean;
  delay?: number;
  className?: string;
};

const OffTheShelfLogoBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 10,
  orientation = 'bottomLeft',
  isActive = false,
  hasStartCorners = true,
  hasEndCorners = true,
  delay = 0,
  className,
}) => {
  const indexes = {
    bottomLeft: [0, 1, 2],
    topRight: [2, 1, 0],
  };

  return (
    <div className={[css.offTheShelfLogoBorders, className || ''].join(' ')}>
      <div
        style={{
          // position: 'relative',
          // top: strokeWidth * 1.5 * 2,
          paddingTop: strokeWidth * 1.5 * 2,
        }}
      >
        <OffTheShelfLogoBorder
          index={indexes[orientation][0]}
          strokeWidth={strokeWidth}
          orientation={orientation}
          colour="white"
          isActive={isActive}
          hasStartCorner={hasStartCorners}
          hasEndCorner={hasEndCorners}
          delay={delay}
        />
        <OffTheShelfLogoBorder
          index={indexes[orientation][1]}
          strokeWidth={strokeWidth}
          orientation={orientation}
          colour="yellow"
          isActive={isActive}
          hasStartCorner={hasStartCorners}
          hasEndCorner={hasEndCorners}
          delay={delay}
        />
        <OffTheShelfLogoBorder
          index={indexes[orientation][2]}
          strokeWidth={strokeWidth}
          orientation={orientation}
          colour="teal"
          isActive={isActive}
          hasStartCorner={hasStartCorners}
          hasEndCorner={hasEndCorners}
          delay={delay}
        />
      </div>
    </div>
  );
};

export default OffTheShelfLogoBorders;
