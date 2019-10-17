import * as React from 'react';
import { motion } from 'framer-motion';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './OffTheShelfLogoBorder.scss';

import variables from '../../styles/variables.scss';

type Props = {
  index?: number;
  strokeWidth?: number;
  colour?: 'white' | 'yellow' | 'teal';
  className?: string;
};

const OffTheShelfLogoBorder: React.FunctionComponent<Props> = ({
  index = 0,
  strokeWidth = 15,
  colour = 'white',
  className,
}) => {
  const [ref, dimensions] = useDimensions();

  const { width, height } = dimensions;
  const baseline = strokeWidth * 1.5;

  // console.log(width, height);

  return (
    <motion.div
      className={[css.offTheShelfLogoBorder, className || ''].join(' ')}
      ref={ref}
      variants={{
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: baseline * index,
          y: -baseline * index,
        },
      }}
      initial="start"
      animate="end"
      transition={{
        delay: 1.5,
        transition: 1,
      }}
    >
      <motion.svg width={width - baseline * 2} height={height}>
        {width && height && (
          <motion.path
            d={`
              M ${baseline} 0 
              L 0 0
              L 0 ${height} 
              L ${width - baseline * 2} ${height} 
              L ${width - baseline * 2} ${height - baseline}
            `}
            fill="transparent"
            strokeWidth={strokeWidth}
            stroke={variables[`colour-${colour}`]}
            variants={{
              hidden: {
                pathLength: 0,
              },
              visible: {
                pathLength: 1,
              },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.5 }}
          ></motion.path>
        )}
      </motion.svg>
    </motion.div>
  );
};

export default OffTheShelfLogoBorder;
