import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import css from './Loader.scss';

import variables from '../../styles/variables.scss';

type Props = {
  strokeWidth?: number;
  isActive?: boolean;
  delay?: number;
  className?: string;
};

const Loader: React.FunctionComponent<Props> = ({
  strokeWidth = 4,
  isActive = true,
  delay = 0,
  className,
}) => {
  const width = strokeWidth * 25;
  const height = strokeWidth * 25;

  const duration = 6;
  const baseline = strokeWidth * 1.5;

  const paths = {
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
    <AnimatePresence>
      {isActive && width && height && (
        <motion.div
          className={[css.loader, className || ''].join(' ')}
          exit={{
            opacity: 0,
          }}
        >
          <motion.svg
            width={width}
            height={height}
            // ref={ref}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.path
              d={paths.blue}
              fill={'transparent'}
              strokeWidth={strokeWidth}
              stroke={variables['colour-teal']}
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
              transition={{
                loop: Infinity,
                delay,
                duration,
                ease: 'easeInOut',
              }}
              strokeDasharray="0 1"
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
                delay: delay + 0.7,
                duration,
                ease: 'easeInOut',
              }}
              strokeDasharray="0 1"
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
                delay: delay + 1.4,
                duration,
                ease: 'easeInOut',
              }}
              strokeDasharray="0 1"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
