import { useQuestions } from '@/hooks/useQuestions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import QuestionsList from '../QuestionsList';

const QuickQuestionsForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);

  const queryParams = useSearchParams();
  const filter = queryParams.get('filter');

  const [question, setQuestion] = useState(filter ?? '');

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setQuestion(value);
  };

  const handleSearch = () => {
    if (!question) return;
  };

  const { questions, fetchNextPage } = useQuestions({ filter: question });

  useEffect(
    function setMounted() {
      if (!mounted.current) {
        fetchNextPage();
      }

      mounted.current = true;

      return () => {
        mounted.current = false;
      };
    },
    [fetchNextPage]
  );

  useEffect(
    function focusInput() {
      const inputMounted = inputRef.current;
      const shouldFocus = !filter && filter !== null && inputMounted;

      if (shouldFocus) {
        inputRef.current.focus();
      }
    },
    [filter]
  );

  return (
    <>
      <form className="mt-8 w-72">
        <Input
          ref={inputRef}
          id="question"
          label="Question"
          onChange={handleChangeInput}
          value={question}
        />
        <Button
          className="w-full h-10 mt-4"
          isLoading={false}
          onClick={handleSearch}
        >
          Search
        </Button>
      </form>

      <div className="flex justify-center mt-8 px-44">
        <QuestionsList questions={questions} />
      </div>
    </>
  );
};

export default QuickQuestionsForm;
