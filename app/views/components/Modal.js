import React, { useEffect } from 'react';
import Close from '../icons/Close';
import IconButton from '../components/IconButton';
import modal, { mask, close } from './modal.style';

export default function Modal({
  active,
  children,
  onClose,
}) {
  useEffect(() => {
    const onKeydown = ({ key }) => {
      if (key !== 'Escape') return;
      onClose();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <>
      <div
        css={ modal }
        style={ {
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
        } }
      >
        <IconButton
          css={ close }
          onClick={ e => {
            e.stopPropagation();
            onClose();
          } }
        >
          <Close />
        </IconButton>
        { children }
      </div>
      <div
        css={ mask }
        onClick={ onClose }
        style={ {
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
        } }
      />
    </>
  );
};