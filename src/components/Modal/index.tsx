'use client';
import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  actions?: React.ReactNode;
  withClose?: boolean;
};

const Modal = ({ children, isOpen, onClose, actions, withClose }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-75"></div>

      <div className="bg-white z-10 rounded-lg">
        {withClose && (
          <div className="flex w-full justify-end pr-2 cursor-pointer">
            <span onClick={onClose}>x</span>
          </div>
        )}
        <div className="p-4 ">{children}</div>
      </div>
      {actions && <div className="flex flex-1">{actions}</div>}
    </div>,
    document.body
  );
};

export default Modal;
