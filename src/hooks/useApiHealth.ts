'use client';
import fetchMiddleware from '@/config/fetch';
import { useEffect, useRef, useState } from 'react';

type Props = {
  checkOnLoad?: boolean;
};

export const useApiHealth = (params: Props = {}) => {
  const { checkOnLoad } = params;

  const mounted = useRef(false);

  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(!!checkOnLoad);

  useEffect(() => {
    if (!checkOnLoad || mounted.current) {
      return;
    }

    mounted.current = true;

    checkApiHealth();
  }, [checkOnLoad]);

  const checkApiHealth = async () => {
    setIsLoading(true);
    const isHealthy = await fetchMiddleware.healthCheck();
    setIsHealthy(isHealthy);
    setIsLoading(false);
    return isHealthy;
  };

  const setHealth = (isHealthy: boolean) => {
    setIsHealthy(isHealthy);
  };

  return { isLoading, isHealthy, checkApiHealth, setHealth };
};
