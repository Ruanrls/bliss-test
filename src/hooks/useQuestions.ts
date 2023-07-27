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
      return false;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await fetchQuestions.next();
    if (data.done) return data;

    setQuestions((prev) => [...prev, ...data.value]);
    setIsLoading(false);
    return data;
  }, [fetchQuestions]);

  const handleSearch = useCallback(async (filter: string) => {
    const fetchQuestions = getPaginatedQuestions(DEFAULT_LIMIT, filter);
    setFetchQuestions(fetchQuestions);
    const data = await fetchQuestions.next();

    if (data.done) {
      return;
    }

    setQuestions(data.value);
  }, []);

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
    handleSearch,
  };
};
