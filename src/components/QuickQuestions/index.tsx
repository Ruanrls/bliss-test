'use client';
import { useApiHealth } from '@/hooks';
import Image from 'next/image';

import Container from '../Container';
import QuickQuestionsForm from '../QuickQuestionsForm';
import UnhealthyApiModal from '../UnhealthyApiModal';

const QuickQuestions = () => {
  const { isHealthy, isLoading, setHealth } = useApiHealth({
    checkOnLoad: false,
  });

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Image
        className="mt-4"
        src="icons/loading-spinner-black.svg"
        alt="Black loading spinner moving"
        width={45}
        height={45}
      />
    );
  }

  return (
    <>
      <UnhealthyApiModal
        isOpen={!isHealthy}
        handleClose={handleRetry}
        withClose
      />

      <Container className="mt-4 w-">
        {isHealthy && <p className="text-center">api is online!</p>}
        <QuickQuestionsForm onFail={() => setHealth(false)} />
      </Container>
    </>
  );
};

export default QuickQuestions;
