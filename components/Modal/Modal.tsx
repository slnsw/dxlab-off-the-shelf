import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Overlay from '../Overlay';

import { useKeyPress, useWindowSize } from '../../lib/hooks';

import css from './Modal.scss';

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

  return (
    <>
      <Overlay isActive={isActive} onClick={onClose}></Overlay>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{
              opacity: 1,
              x: initialSize.x,
              y: initialSize.y,
              // width: initialSize.width,
              // height: initialSize.height,
              width: windowSize.width - 32,
              height: windowSize.height - 32,
            }}
            animate={{
              opacity: 1,
              x: 16,
              y: 16,
              width: windowSize.width - 32,
              height: windowSize.height - 32,
            }}
            exit={{
              opacity: 0.5,
              x: initialSize.x,
              y: initialSize.y,
              width: initialSize.width,
              height: initialSize.height,
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
