import { useQuestions } from '@/hooks/useQuestions';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import QuestionsList from '../QuestionsList';

type Props = {
  onFail: () => void;
};

const QuickQuestionsForm = ({ onFail }: Props) => {
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

  const handleRequest = useCallback(
    async (request: () => Promise<unknown> | void) => {
      try {
        return await request();
      } catch (e) {
        console.log('error');
        onFail();
        console.error(e);
      }
    },
    [onFail]
  );

  const onSearch = async () => {
    if (!question) return;

    handleRequest(async () => await handleSearch(question));
  };

  const { questions, fetchNextPage, isLoading, handleSearch } = useQuestions({
    filter: question,
  });

  const onReachEnd = async () => {
    handleRequest(fetchNextPage);
  };

  useEffect(
    function setMounted() {
      const mount = async () => {
        if (!mounted.current) {
          const fetched = await handleRequest(fetchNextPage);
          console.log(fetched);
          mounted.current = !!fetched;
        }
      };

      mount();
    },
    [fetchNextPage, handleRequest]
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
          isLoading={isLoading}
          onClick={onSearch}
        >
          Search
        </Button>
      </form>

      <div className="flex justify-center mt-8 px-44">
        <QuestionsList
          questions={questions}
          onReachEnd={onReachEnd}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default QuickQuestionsForm;
