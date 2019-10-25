import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './OffTheShelfLogoBorder.scss';

import variables from '../../styles/variables.scss';

type Props = {
  index?: number;
  strokeWidth?: number;
  orientation?: 'bottomLeft' | 'topRight';
  colour?: 'white' | 'yellow' | 'teal';
  isActive?: boolean;
  hasStartCorner?: boolean;
  hasEndCorner?: boolean;
  className?: string;
};

const OffTheShelfLogoBorder: React.FunctionComponent<Props> = ({
  index = 0,
  strokeWidth = 16,
  orientation = 'bottomLeft',
  colour = 'white',
  isActive = false,
  hasStartCorner = true,
  hasEndCorner = true,
  className,
}) => {
  const [ref, dimensions] = useDimensions();

  const { width, height } = dimensions;
  const baseline = strokeWidth * 1.5;

  const divControls = useAnimation();
  // const svgControls = useAnimation();

  React.useEffect(() => {
    divControls.start(isActive ? 'end' : 'start');
    // console.log(width, height);
  }, [isActive, divControls, width, height, baseline]);

  const paths = {
    bottomLeft: `
      M ${hasStartCorner ? baseline : 0} 0 
      L 0 0
      L 0 ${height} 
      L ${width - baseline * 2} ${height} 
      L ${width - baseline * 2} ${height - baseline}
    `,
    topRight: `
      M 0 ${hasStartCorner ? baseline : 0}
      L 0 0
      L ${width - baseline * 2} 0
      L ${width - baseline * 2} ${height}
      L ${width - baseline * 3} ${height}
    `,
  };

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
      // animate={isActive ? 'end' : 'start'}
      animate={divControls}
      transition={{
        type: 'spring',
        delay: 1,
        transition: 1,
        damping: 8,
      }}
    >
      {width && height && (
        <motion.svg width={width - baseline * 2} height={height}>
          <motion.path
            d={paths[orientation]}
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
            animate={isActive ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.2, duration: 1 }}
          />
        </motion.svg>
      )}
    </motion.div>
  );
};

export default OffTheShelfLogoBorder;
