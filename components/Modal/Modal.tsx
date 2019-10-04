import * as React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useKeyPress, useWindowSize } from '../../lib/hooks';

import css from './Modal.scss';

type Props = {
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
            width: windowSize.width - 64,
            height: windowSize.height - 64,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={[css.modal, className || ''].join(' ')}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
