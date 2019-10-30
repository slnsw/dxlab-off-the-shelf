import { motion } from 'framer-motion';
import * as React from 'react';

import useDimensions from '../../lib/hooks/use-dimensions';

import css from './Loader.scss';

import variables from '../../styles/variables.scss';

type Props = {
  strokeWidth: number;
  isActive: boolean;
  delay: number;
  className?: string;
};

const Loader: React.FunctionComponent<Props> = ({
  strokeWidth = 16,
  isActive = false,
  delay = 0,
  className,
}) => {
  const [ref, dimensions] = useDimensions();

  let { width, height } = dimensions;
  width = 400;
  height = 200;

  console.log('dims:', width, height);
  const baseline = strokeWidth * 1.5;

  const paths = {
    // white: `
    //   M ${width - baseline * 2} ${height - baseline * 2}
    //   L ${baseline * 2} ${height - baseline * 2}
    //   L ${baseline * 2} ${baseline * 2}
    //   L ${width - baseline * 2} ${baseline * 2}
    //   L ${width - baseline * 2} ${height - baseline * 2}
    // `,

    //   yellow: `
    //   M ${width - baseline * 4} ${baseline * 4}
    //   L ${width - baseline * 4} ${height - baseline * 4}
    //   L ${baseline * 4} ${height - baseline * 4}
    //   L ${baseline * 4} ${baseline * 4}
    //   L ${width - baseline * 4} ${baseline * 4}
    // `,

    white: `
  M ${baseline * 2} ${baseline * 2} 
  L ${width - baseline * 2} ${baseline * 2}
  L ${width - baseline * 2} ${height - baseline * 2}
  L ${baseline * 2} ${height - baseline * 2}
  L ${baseline * 2} ${baseline * 2} 
`,

    yellow: `
  M ${baseline * 4} ${baseline * 4} 
  L ${width - baseline * 4} ${baseline * 4}
  L ${width - baseline * 4} ${height - baseline * 4}
  L ${baseline * 4} ${height - baseline * 4}
  L ${baseline * 4} ${baseline * 4} 
`,

    blue: `
      M ${baseline * 6} ${baseline * 6} 
      L ${width - baseline * 6} ${baseline * 6}
      L ${width - baseline * 6} ${height - baseline * 6}
      L ${baseline * 6} ${height - baseline * 6}
      L ${baseline * 6} ${baseline * 6} 
    `,
  };

  return (
    <div className={[css.loader, className || ''].join(' ')}>
      {width && height && (
        <motion.svg width={width} height={height} ref={ref}>
          <>
            <motion.path
              d={paths.blue}
              fill={'transparent'}
              strokeWidth={strokeWidth}
              stroke={variables['colour-teal']}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
              transition={{
                loop: Infinity,
                delay: 0,
                duration: 4,
                ease: 'linear',
              }}
            />
            <motion.path
              d={paths.yellow}
              fill={'transparent'}
              strokeWidth={strokeWidth}
              stroke={variables['colour-yellow']}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
              transition={{
                loop: Infinity,
                delay: 0.5,
                duration: 4,
                ease: 'linear',
              }}
            />
            <motion.path
              d={paths.white}
              fill={'transparent'}
              strokeWidth={strokeWidth}
              stroke={variables['colour-white']}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
              transition={{
                loop: Infinity,
                delay: 1,
                duration: 4,
                ease: 'linear',
              }}
            />
          </>
        </motion.svg>
      )}
      <p>LOADING</p>
    </div>
  );
};

export default Loader;
