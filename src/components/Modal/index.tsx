'use client';
import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
  isOpen: () => null;
  onClose: () => null;
  actions?: React.ReactNode;
};

const Modal = ({ children, isOpen, onClose, actions }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="bg-white p-8 rounded-lg z-10">{children}</div>
      {actions && <div className="flex flex-1">{actions}</div>}
    </div>,
    document.getElementById('#modal-container')!
  );
};

export default Modal;
