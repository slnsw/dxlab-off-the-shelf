import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Overlay from '../Overlay';

import { useKeyPress, useWindowSize } from '../../lib/hooks';

import css from './Modal.module.scss';

export type Props = {
  isActive?: boolean;
  initialSize?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  className?: string;
  children?: string | React.ReactNode;
  onClose?: Function;
};

const Modal: React.FunctionComponent<Props> = ({
  isActive = false,
  initialSize = {
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  },
  className,
  children,
  onClose,
}) => {
  useKeyPress('Escape', () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  });
  const windowSize = useWindowSize();
  const GUTTER = 0;

  return (
    <>
      <Overlay isActive={isActive} onClick={onClose}></Overlay>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{
              opacity: 0,
              // x: initialSize.x,
              // y: initialSize.y,
              // width: initialSize.width,
              // height: initialSize.height,
              x: 0,
              y: 0,
              width: windowSize.width - GUTTER,
              height: windowSize.height - GUTTER,
            }}
            animate={{
              opacity: 1,
              x: GUTTER / 2,
              y: GUTTER / 2,
              width: windowSize.width - GUTTER,
              height: windowSize.height - GUTTER,
            }}
            exit={{
              opacity: 0,
              // x: initialSize.x,
              // y: initialSize.y,
              // width: initialSize.width,
              // height: initialSize.height,
              x: 0,
              y: 0,
              width: windowSize.width - GUTTER,
              height: windowSize.height - GUTTER,
            }}
            transition={{ duration: 0.3 }}
            className={[css.modal, className || ''].join(' ')}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
