import { Fetch } from '@/utils/fetch';
import { ENV } from './env';

const fetchMiddleware = new Fetch({
  baseUrl: ENV.API_URL,
  prefetchUrl: `${ENV.API_URL}/health`,
  // prefetchUrl: 'http://localhost:8000/',
});

export default fetchMiddleware;
