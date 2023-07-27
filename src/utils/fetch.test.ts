import { APIStatus } from '@/types/status';
import { MockedFunction, afterEach, describe, expect, it, vi } from 'vitest';
import { Fetch } from './fetch';

declare let fetch: MockedFunction<typeof global.fetch>;

describe('Fetch', () => {
  const baseUrl = 'https://example.com/api';
  const prefetchUrl = 'https://example.com/prefetch';
  const fetchInstance = new Fetch({ baseUrl, prefetchUrl });

  fetch = vi.fn();

  afterEach(() => {
    fetch.mockClear();
  });

  it('should fetch data from the API', async () => {
    const responseResult = {
      status: APIStatus.OK,
    };
    const mockResponse = {
      json: async () => responseResult,
    } as Response;
    fetch.mockResolvedValue(mockResponse);

    const result = await fetchInstance.fetch('/data');

    expect(result).toEqual(responseResult);
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[0][0]).toEqual(prefetchUrl);
    expect(fetch.mock.calls[1][0]).toEqual(`${baseUrl}/data`);
  });

  it('should throw an error if the API health check fails', async () => {
    const mockResponse = {
      json: async () => ({
        status: APIStatus.ERROR,
      }),
    } as Response;
    fetch.mockResolvedValue(mockResponse);

    await expect(fetchInstance.fetch('/data')).rejects.toThrow(
      "API's health check failed"
    );
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(prefetchUrl);
  });

  it('should throw an error if no prefetch URL is provided', async () => {
    const fetchInstance = new Fetch({ baseUrl });

    await expect(fetchInstance.healthCheck()).rejects.toThrow(
      'No prefetch url provided'
    );
  });

  it('should abort the fetch request', async () => {
    const abortReason = 'Abort fetch';
    const abortSignal = await fetchInstance.abort(abortReason);

    expect(abortSignal.aborted).toBe(true);
    expect(abortSignal.reason).toBe(abortReason);
  });
});
