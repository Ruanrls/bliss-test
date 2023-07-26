'use client';
import { useApiHealth } from '@/hooks';
import Image from 'next/image';
import Input from '../Input';
import UnhealthyApiModal from '../UnhealthyApiModal';

const QuickQuestions = () => {
  const { isHealthy, isLoading, checkApiHealth } = useApiHealth({
    checkOnLoad: true,
  });

  if (isLoading) {
    return (
      <Image
        className="mt-4"
        src="icons/loading-spinner.svg"
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
        handleClose={checkApiHealth}
        withClose
      />
      {isHealthy && <p className="mt-4">api is online!</p>}
      <form className="mt-8 w-full">
        <Input id="question" label="Question" />
      </form>
    </>
  );
};

export default QuickQuestions;
