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
  initialSize,
  className,
  children,
  onClose,
}) => {
  const escapeKeyPress = useKeyPress('Escape');
  const windowSize = useWindowSize();

  if (escapeKeyPress && typeof onClose === 'function') {
    onClose();
  }

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
              width: initialSize.width,
              height: initialSize.height,
            }}
            animate={{
              opacity: 1,
              x: 16,
              y: 16,
              width: windowSize.width - 32,
              height: windowSize.height - 32,
            }}
            exit={{
              opacity: 0,
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
