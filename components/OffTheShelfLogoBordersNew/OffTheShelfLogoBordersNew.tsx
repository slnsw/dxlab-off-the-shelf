import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

import css from './OffTheShelfLogoBordersNew.scss';

type Props = {
  strokeWidth?: number;
  notchLength?: number;
  orientation?: 'bottomLeft' | 'topRight';
  className?: string;
};

const OffTheShelfLogoBordersNew: React.FunctionComponent<Props> = ({
  strokeWidth = 8,
  notchLength = 24,
  orientation = 'bottomLeft',
  className,
}) => {
  const borderGroups = {
    bottomLeft: (index) => {
      const topBorderMargin = `${notchLength * index}px`;
      const rightBorderMargin = `${notchLength * index}px`;
      const leftBorderMargin = `${notchLength * (2 - index)}px`;
      const bottomBorderMargin = `${notchLength * (2 - index)}px`;

      const borderDelay = index * 0.4;

      return [
        {
          initial: {
            width: 0,
            right: `calc(100% - ${notchLength}px - ${leftBorderMargin})`,
            top: topBorderMargin,
            height: strokeWidth,
          },
          animate: {
            width: notchLength,
          },
          transition: {
            duration: 0.3,
            delay: borderDelay,
          },
        },
        {
          initial: {
            height: 0,
            top: topBorderMargin,
            left: leftBorderMargin,
            width: strokeWidth,
          },
          animate: {
            height: `calc(100% - ${bottomBorderMargin} - ${topBorderMargin})`,
          },
          transition: {
            duration: 1,
            delay: 0.3 + borderDelay,
          },
        },
        {
          initial: {
            width: 0,
            left: leftBorderMargin,
            height: strokeWidth,
            bottom: bottomBorderMargin,
          },
          animate: {
            width: `calc(100% - ${leftBorderMargin} - ${rightBorderMargin})`,
          },
          transition: {
            duration: 1,
            delay: 1.3 + borderDelay,
          },
        },
        {
          initial: {
            height: 0,
            width: strokeWidth,
            right: rightBorderMargin,
            bottom: bottomBorderMargin,
          },
          animate: {
            height: notchLength,
          },
          transition: {
            duration: 0.3,
            delay: 2.3 + borderDelay,
          },
        },
      ];
    },
    topRight: (index) => {
      const topBorderMargin = `${notchLength * (2 - index)}px`;
      const rightBorderMargin = `${notchLength * (2 - index)}px`;
      const leftBorderMargin = `${notchLength * index}px`;
      const bottomBorderMargin = `${notchLength * index}px`;

      const borderDelay = index * 0.4;

      return [
        {
          initial: {
            height: 0,
            width: strokeWidth,
            left: leftBorderMargin,
            bottom: `calc(100% - ${topBorderMargin} - ${notchLength}px)`,
          },
          animate: {
            height: notchLength,
          },
          transition: {
            duration: 0.3,
            delay: borderDelay,
          },
        },
        {
          initial: {
            width: 0,
            top: topBorderMargin,
            left: leftBorderMargin,
            height: strokeWidth,
          },
          animate: {
            width: `calc(100% - ${bottomBorderMargin} - ${topBorderMargin})`,
          },
          transition: {
            duration: 1,
            delay: 0.3 + borderDelay,
          },
        },
        {
          initial: {
            height: 0,
            right: rightBorderMargin,
            width: strokeWidth,
            top: topBorderMargin,
          },
          animate: {
            height: `calc(100% - ${leftBorderMargin} - ${rightBorderMargin})`,
          },
          transition: {
            duration: 1,
            delay: 1.3 + borderDelay,
          },
        },
        {
          initial: {
            width: 0,
            height: strokeWidth,
            right: rightBorderMargin,
            bottom: bottomBorderMargin,
          },
          animate: {
            width: notchLength,
          },
          transition: {
            duration: 0.3,
            delay: 2.3 + borderDelay,
          },
        },
      ];
    },
  };

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
        let cssBorderColour = '';

        if (border.colour === 'yellow') {
          cssBorderColour = css.yellow;
        } else if (border.colour === 'white') {
          cssBorderColour = css.white;
        }

        return (
          <Fragment key={index}>
            {borderGroups[orientation](index).map((line) => {
              return (
                <motion.div
                  className={[css.border, cssBorderColour].join(' ')}
                  initial={line.initial}
                  animate={line.animate}
                  transition={line.transition}
                />
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default OffTheShelfLogoBordersNew;
