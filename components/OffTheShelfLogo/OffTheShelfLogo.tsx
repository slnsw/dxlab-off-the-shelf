import * as React from 'react';

import OffTheShelfLogoText from '../OffTheShelfLogoText';
// import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';
import OffTheShelfLogoDivBorders from '../OffTheShelfLogoDivBorders';

import css from './OffTheShelfLogo.scss';

type Props = {
  isActive?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

const OffTheShelfLogo: React.FunctionComponent<Props> = ({
  isActive = true,
  size = 'md',
  className,
}) => {
  return (
    <div className={[css.offTheShelfLogo, className || ''].join(' ')}>
      {/* <img
        src="/off-the-shelf/images/off-the-shelf-logo.jpg"
        alt="Off The Shelf"
        style={{
          position: 'absolute',
          width: '100%',
          top: 0,
        }}
      /> */}

      <OffTheShelfLogoText
        isActive={isActive}
        delay={1.5}
        className={css.text}
      />
      {/* <OffTheShelfLogoBorders
        strokeWidth={size === 'sm' ? 8 : 16}
        isActive={isActive}
        className={css.borders}
      /> */}
      <OffTheShelfLogoDivBorders
        strokeWidth={size === 'sm' ? 4 : 8}
        isActive={isActive}
        className={css.divBorders}
      />
    </div>
  );
};

export default OffTheShelfLogo;
