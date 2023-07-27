'use client';

import UnhealthyApiModal from '@/components/UnhealthyApiModal';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const handleClose = () => window.location.reload();

  return <UnhealthyApiModal isOpen={true} handleClose={handleClose} />;
}
