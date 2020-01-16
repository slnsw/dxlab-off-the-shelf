import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

import css from './OffTheShelfLogoBordersNew.scss';
// import variables from '../../styles/variables.scss';

type Props = {
  strokeWidth?: number;
  notchLength?: number;
  className?: string;
};

const OffTheShelfLogoBordersNew: React.FunctionComponent<Props> = ({
  strokeWidth = 8,
  notchLength = 24,
  className,
}) => {
  return (
    <div className={[css.offTheShelfLogoBordersNew, className || ''].join(' ')}>
      {[
        {
          colour: 'teal',
        },
        {
          colour: 'yellow',
        },
        {
          colour: 'white',
        },
      ].map((border, index) => {
        const topBorderMargin = `${notchLength * index}px`;
        const rightBorderMargin = `${notchLength * index}px`;
        const leftBorderMargin = `${notchLength * (2 - index)}px`;
        const bottomBorderMargin = `${notchLength * (2 - index)}px`;

        const borderDelay = index * 0.4;

        let cssBorderColour = '';

        if (border.colour === 'yellow') {
          cssBorderColour = css.yellow;
        } else if (border.colour === 'white') {
          cssBorderColour = css.white;
        }

        return (
          <Fragment key={index}>
            <motion.div
              className={[css.border, cssBorderColour].join(' ')}
              style={{
                top: topBorderMargin,
                height: strokeWidth,
              }}
              initial={{
                width: 0,
                right: `calc(100% - ${notchLength}px - ${leftBorderMargin})`,
              }}
              animate={{
                width: notchLength,
              }}
              transition={{
                duration: 0.3,
                delay: borderDelay,
              }}
            />

            <motion.div
              className={[css.border, cssBorderColour].join(' ')}
              style={{
                top: topBorderMargin,
                left: leftBorderMargin,
                width: strokeWidth,
              }}
              initial={{
                height: 0,
              }}
              animate={{
                // height: '100%',
                height: `calc(100% - ${bottomBorderMargin} - ${topBorderMargin})`,
              }}
              transition={{
                duration: 1,
                delay: 0.3 + borderDelay,
              }}
            />

            <motion.div
              className={[css.border, cssBorderColour].join(' ')}
              style={{
                left: leftBorderMargin,
                height: strokeWidth,
                bottom: bottomBorderMargin,
              }}
              initial={{
                width: 0,
              }}
              animate={{
                // width: '100%',
                width: `calc(100% - ${leftBorderMargin} - ${rightBorderMargin})`,
              }}
              transition={{
                duration: 1,
                delay: 1.3 + borderDelay,
              }}
            />

            <motion.div
              className={[css.border, cssBorderColour].join(' ')}
              style={{
                width: strokeWidth,
                right: rightBorderMargin,
                bottom: bottomBorderMargin,
              }}
              initial={{
                height: 0,
              }}
              animate={{
                height: notchLength,
              }}
              transition={{
                duration: 0.3,
                delay: 2.3 + borderDelay,
              }}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default OffTheShelfLogoBordersNew;
