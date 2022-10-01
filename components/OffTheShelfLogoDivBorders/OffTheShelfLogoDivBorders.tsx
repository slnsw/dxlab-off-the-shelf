// @ts-nocheck
import React, { Fragment } from 'react';
import { motion } from 'framer-motion';

import css from './OffTheShelfLogoDivBorders.module.scss';

type Props = {
  strokeWidth?: number;
  notchLength?: number;
  orientation?: 'bottomLeft' | 'topRight';
  isActive?: boolean;
  className?: string;
};

const OffTheShelfLogoDivBorders: React.FunctionComponent<Props> = ({
  strokeWidth = 8,
  notchLength = 24,
  orientation = 'bottomLeft',
  isActive,
  className,
}) => {
  const notchDuration = 0.2;
  const lineDuration = 0.5;

  const borderGroups = {
    bottomLeft: (index) => {
      const topBorderMargin = `${notchLength * index}px`;
      const rightBorderMargin = `${notchLength * index}px`;
      const leftBorderMargin = `${notchLength * (2 - index)}px`;
      const bottomBorderMargin = `${notchLength * (2 - index)}px`;

      const borderDelay = index * 0.2;

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
            duration: notchDuration,
            // delay: borderDelay,
            delay: isActive
              ? borderDelay
              : notchDuration + lineDuration * 2 + borderDelay,
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
            duration: lineDuration,
            // delay: notchDuration + borderDelay,
            delay: isActive
              ? notchDuration + borderDelay
              : lineDuration + notchDuration + borderDelay,
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
            duration: lineDuration,
            delay: isActive
              ? lineDuration + notchDuration + borderDelay
              : notchDuration + borderDelay,
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
            duration: notchDuration,
            delay: isActive
              ? notchDuration + lineDuration * 2 + borderDelay
              : borderDelay,
          },
        },
      ];
    },
    topRight: (index) => {
      const topBorderMargin = `${notchLength * (2 - index)}px`;
      const rightBorderMargin = `${notchLength * (2 - index)}px`;
      const leftBorderMargin = `${notchLength * index}px`;
      const bottomBorderMargin = `${notchLength * index}px`;

      const borderDelay = index * 0.3;

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
            duration: notchDuration,
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
            duration: lineDuration,
            delay: notchDuration + borderDelay,
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
            duration: lineDuration,
            delay: notchDuration + lineDuration + borderDelay,
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
            duration: notchDuration,
            delay: notchDuration + lineDuration * 2 + borderDelay,
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

        const lines = borderGroups[orientation](index);

        return (
          <Fragment key={index}>
            {lines.map((line, lineIndex) => {
              return (
                <motion.div
                  className={[css.border, cssBorderColour].join(' ')}
                  initial={line.initial}
                  animate={isActive ? line.animate : line.initial}
                  transition={line.transition}
                  key={lineIndex}
                />
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default OffTheShelfLogoDivBorders;
