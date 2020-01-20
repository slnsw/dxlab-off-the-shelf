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
  size = 'sm',
  className,
}) => {
  return (
    <div
      className={[
        css.offTheShelfLogo,
        className || '',
        size === 'sm' ? css.sm : '',
      ].join(' ')}
    >
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
        className={[css.text, size === 'sm' ? css.sm : ''].join(' ')}
      />

      {/* <OffTheShelfLogoBorders
        strokeWidth={size === 'sm' ? 8 : 16}
        isActive={isActive}
        className={css.borders}
      /> */}

      <OffTheShelfLogoDivBorders
        strokeWidth={size === 'sm' ? 4 : 8}
        notchLength={size === 'sm' ? 12 : 24}
        isActive={isActive}
        className={[css.divBorders, size === 'sm' ? css.sm : ''].join(' ')}
      />
    </div>
  );
};

export default OffTheShelfLogo;
