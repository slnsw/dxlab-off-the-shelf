import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import css from './OffTheShelfLogoText.module.scss';
import variables from '../../styles/variables.module.scss';

type Props = {
  isActive?: boolean;
  delay?: number;
  className?: string;
};

const OffTheShelfLogoText: React.FunctionComponent<Props> = ({
  isActive,
  delay = 0,
  className,
}) => {
  const getPathVariants = (index) => {
    return {
      hidden: {
        pathLength: 0,
        stroke: variables['colour-white'],
        strokeWidth: 4,
        fill: variables['colour-black'],
        opacity: 0,
      },
      end: {
        pathLength: 1,
        stroke: variables['colour-black'],
        strokeWidth: 0,
        fill: variables['colour-white'],
        opacity: 1,
      },
    };
  };

  const getPathTransition = (index) => {
    return {
      delay: delay + index * 0.07 + (isActive ? 0 : -0.6),
      duration: isActive ? 4 : 1,
    };
  };

  const textPaths = [
    {
      letter: 'O',
      d:
        'M53.37,122H29.62A20.07,20.07,0,0,1,15,115.86a19.73,19.73,0,0,1-6.24-14.5V30a19.83,19.83,0,0,1,6.28-14.5A20,20,0,0,1,29.62,9.28H53.3a20.25,20.25,0,0,1,14.61,6.24,19.81,19.81,0,0,1,6.35,14.57v71.2a19.68,19.68,0,0,1-6.35,14.53A20.22,20.22,0,0,1,53.37,122m0-91.94H29.62v71.13H53.37Z',
    },
    {
      letter: 'F',
      d:
        'M133,30.09H105.19V55.21h23.32q5.09,0,5.1,5.17V70.93q0,5.17-5.1,5.17H105.19v40.77q0,5.17-5.17,5.17H89.48q-5.17,0-5.17-5.17V29.16a19.2,19.2,0,0,1,5.81-14,19.1,19.1,0,0,1,14.07-5.85H133q5.17,0,5.17,5.17V25q0,5.1-5.17,5.1',
    },
    {
      letter: 'F',
      d:
        'M197,30.09H169.14V55.21h23.33q5.09,0,5.1,5.17V70.93q0,5.17-5.1,5.17H169.14v40.77q0,5.17-5.17,5.17H153.42q-5.17,0-5.17-5.17V29.16a19.2,19.2,0,0,1,5.81-14,19.1,19.1,0,0,1,14.07-5.85H197q5.17,0,5.17,5.17V25q0,5.1-5.17,5.1',
    },
    {
      letter: 'T',
      d:
        'M257.07,64.25V58.13a2.65,2.65,0,0,0-3-3H224a2.65,2.65,0,0,0-3,3v6.12q0,3,3,3h9v41.09a2.65,2.65,0,0,0,3,3h6.12a2.65,2.65,0,0,0,3-3V67.2h9q3,0,3-3',
    },
    {
      letter: 'HE',
      d:
        'M299.42,108.29V58.13q0-3-3-3h-6.12a2.65,2.65,0,0,0-3,3v19H273.66v-19q0-3-3-3h-6.16q-3,0-3,3v50.16q0,3,3,3h6.16q3,0,3-3v-19h13.69v19a2.65,2.65,0,0,0,3,3h6.12q3,0,3-3m37.33,0v-6.08a2.65,2.65,0,0,0-3-3H317.32v-10h13.53a2.65,2.65,0,0,0,3-3V80.15a2.65,2.65,0,0,0-3-3H317.32v-10h16.19q3,0,3-3V58.13a2.65,2.65,0,0,0-3-3H308.25a2.65,2.65,0,0,0-3,3V99.8a11.51,11.51,0,0,0,11.49,11.49h17a2.65,2.65,0,0,0,3-3',
    },
    {
      letter: 'S',
      d:
        'M63.43,275.7H36.76a25.63,25.63,0,0,1-18.59-7.9,25.28,25.28,0,0,1-8-18.59v-5q0-6.58,6.49-6.58H30.09q6.58,0,6.58,6.58v5H63.43v-32H36.76a25.56,25.56,0,0,1-18.59-7.95,25.33,25.33,0,0,1-8-18.54V158.69q0-10.5,8-18.5a25.49,25.49,0,0,1,18.59-8H63.43q10.5,0,18.5,7.95t8,18.45V163q0,6.49-6.49,6.49H70q-6.58,0-6.58-6.49v-4.29H36.66v32H63.43q10.5,0,18.5,7.95t8,18.45V249.3a25.15,25.15,0,0,1-8,18.54,25.6,25.6,0,0,1-18.5,7.86',
    },
    {
      letter: 'H',
      d:
        'M179.25,275.7H165.83q-6.58,0-6.58-6.58V217.24H129.2v51.88q0,6.58-6.49,6.58H109.19q-6.49,0-6.49-6.58V138.77q0-6.58,6.49-6.58h13.52q6.48,0,6.49,6.58v51.88h30.05V138.77q0-6.58,6.58-6.58h13.43q6.48,0,6.48,6.58V269.12q0,6.58-6.48,6.58',
    },
    {
      letter: 'E',
      d:
        'M261.1,275.7H223.74a25.26,25.26,0,0,1-25.21-25.21V138.77q0-6.58,6.58-6.58h55.45q6.58,0,6.58,6.58V152.2q0,6.49-6.58,6.49H225v32h29.69q6.58,0,6.58,6.58v13.43q0,6.58-6.58,6.58H225v32H261.1q6.58,0,6.58,6.58v13.34q0,6.58-6.58,6.58',
    },
    {
      letter: 'L',
      d:
        'M339.66,275.7H305.77a25.34,25.34,0,0,1-25.3-25.21V138.77q0-6.58,6.58-6.58h13.43q6.58,0,6.58,6.58V249.21h32.61q6.48,0,6.48,6.58v13.34q0,6.58-6.48,6.58',
    },
    {
      letter: 'F',
      d:
        'M421,158.69H385.51v32H415.2q6.48,0,6.49,6.58v13.43q0,6.58-6.49,6.58H385.51v51.88q0,6.58-6.58,6.58H365.51q-6.58,0-6.58-6.58V157.5a25.34,25.34,0,0,1,25.3-25.3H421q6.58,0,6.58,6.58V152.2q0,6.49-6.58,6.49',
    },
  ];

  return (
    <div className={[css.offTheShelfLogoText, className || ''].join(' ')}>
      <AnimatePresence>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 8 419.73 300.42"
        >
          {textPaths.map((path, i) => {
            return (
              <motion.path
                key={i}
                variants={getPathVariants(i)}
                initial="hidden"
                animate={isActive ? 'end' : 'hidden'}
                exit="hidden"
                transition={getPathTransition(i)}
                d={path.d}
                strokeDasharray="0 1"
                // transform="translate(-8.3 -8.78)"
              />
            );
          })}
        </motion.svg>
      </AnimatePresence>
    </div>
  );
};

export default OffTheShelfLogoText;
