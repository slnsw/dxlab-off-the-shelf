import * as React from 'react';

import OffTheShelfLogoText from '../OffTheShelfLogoText';
import OffTheShelfLogoBorders from '../OffTheShelfLogoBorders';

import css from './OffTheShelfLogo.scss';

type Props = {
  isActive?: boolean;
  className?: string;
};

const OffTheShelfLogo: React.FunctionComponent<Props> = ({
  isActive = true,
  className,
}) => {
  return (
    <div className={[css.offTheShelfLogo, className || ''].join(' ')}>
      {/* <img
        src="/images/off-the-shelf-logo.jpg"
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
      <OffTheShelfLogoBorders
        strokeWidth={16}
        isActive={isActive}
        className={css.borders}
      />
    </div>
  );
};

export default OffTheShelfLogo;