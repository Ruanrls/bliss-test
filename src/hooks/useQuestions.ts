import fetchMiddleware from '@/config/fetch';
import { FindAllQuestionsResponse } from '@/types/api';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_LIMIT = 10;

type UseQuestions =
  | {
      filter?: string;
    }
  | undefined;

async function* getPaginatedQuestions(limit: number, filter?: string) {
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: ((page - 1) * limit).toString(),
    });

    if (filter) {
      params.append('filter', filter);
    }

    const data = await fetchMiddleware.fetch<FindAllQuestionsResponse>(
      `/questions?${params.toString()}`
    );
    hasMore = !(data.length < limit);
    page++;
    yield data;
  }
}

export const useQuestions = ({ filter }: UseQuestions = {}) => {
  const [fetchQuestions, setFetchQuestions] =
    useState<AsyncGenerator<FindAllQuestionsResponse>>();

  const [questions, setQuestions] = useState<FindAllQuestionsResponse>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNextPage = useCallback(async () => {
    if (!fetchQuestions) {
      return;
    }

    setIsLoading(true);
    const data = await fetchQuestions.next();
    if (data.done) return;

    setQuestions((prev) => [...prev, ...data.value]);
    setIsLoading(false);
  }, [fetchQuestions]);

  useEffect(
    function createFetchQuestionsGenerator() {
      setFetchQuestions(getPaginatedQuestions(DEFAULT_LIMIT, filter));
    },
    [filter]
  );

  return {
    questions,
    isLoading,
    fetchNextPage,
  };
};
