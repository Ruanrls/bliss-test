'use client';

import { useEffect, useState } from 'react';
import Modal from '../Modal';

const NetworkWatchModal = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(function setEventListeners() {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return function cleanup() {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Modal isOpen={!isOnline}>
      <h3 className="text-2xl font-bold">No internet connection</h3>
    </Modal>
  );
};

export default NetworkWatchModal;
