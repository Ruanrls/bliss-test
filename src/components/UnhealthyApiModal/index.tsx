'use client';
import Button, { ButtonVariants } from '../Button';
import Modal from '../Modal';

type Props = {
  isOpen: boolean;
  handleClose?: () => void;
  withClose?: boolean;
};

const UnhealthyApiModal = ({ isOpen, handleClose, withClose }: Props) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={true} onClose={handleClose} withClose={withClose}>
      <h3 className="text-lg font-semibold">Failed to check api health</h3>
      <p className="text-sm mt-2">
        Api seems to be unaccessible. Please try again later.
      </p>
      <Button
        onClick={handleClose}
        variant={ButtonVariants.danger}
        className="w-full"
      >
        Try again
      </Button>
    </Modal>
  );
};

export default UnhealthyApiModal;
