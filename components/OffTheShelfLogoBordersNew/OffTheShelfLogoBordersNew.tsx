import * as React from 'react';
// import { motion } from 'framer-motion';

import css from './OffTheShelfLogoBordersNew.scss';
import variables from '../../styles/variables.scss';

type Props = {
  className?: string;
  strokeWidth?: number;
};

const OffTheShelfLogoBordersNew: React.FunctionComponent<Props> = ({
  className,
  strokeWidth = 10,
}) => {
  return (
    <div className={[css.offTheShelfLogoBordersNew, className || ''].join(' ')}>
      <div className={css.border}>
        <div
          style={{
            backgroundColor: variables['colour-teal'],
            height: strokeWidth,
            width: 100,
          }}
        />
        <div
          style={{
            backgroundColor: variables['colour-teal'],
            height: '100%',
            width: strokeWidth,
          }}
        />
      </div>
    </div>
  );
};

export default OffTheShelfLogoBordersNew;
