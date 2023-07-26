'use client';
import fetchMiddleware from '@/config/fetch';
import { useEffect, useState } from 'react';

type Props = {
  checkOnLoad?: boolean;
};

export const useApiHealth = (params: Props = {}) => {
  const { checkOnLoad } = params;

  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!checkOnLoad) {
      return;
    }

    checkApiHealth();
  }, [checkOnLoad]);

  const checkApiHealth = async () => {
    setIsLoading(true);
    const isHealthy = await fetchMiddleware.healthCheck();
    setIsHealthy(isHealthy);
    setIsLoading(false);
    return isHealthy;
  };

  return { isLoading, isHealthy, checkApiHealth };
};
