import { act, renderHook } from '@testing-library/react-hooks';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { useApiHealth } from './useApiHealth';

const mockHealthCheck = vi.hoisted(() => vi.fn());
vi.mock('@/config/fetch', () => ({
  default: {
    healthCheck: mockHealthCheck,
  },
}));

describe('useApiHealth', () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should return isLoading as false and isHealthy as true by default', async () => {
    const { result } = renderHook(() => useApiHealth());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isHealthy).toBe(true);
  });

  it('should call checkApiHealth on mount if checkOnLoad is true', async () => {
    mockHealthCheck.mockResolvedValue(false);

    const { result, waitForValueToChange } = renderHook(() =>
      useApiHealth({ checkOnLoad: true })
    );

    await waitForValueToChange(() => result.current.isHealthy);
    expect(result.current.isHealthy).toBeFalsy();
  });

  it('should not call checkApiHealth on mount if checkOnLoad is false', async () => {
    mockHealthCheck.mockResolvedValue(false);

    renderHook(() => useApiHealth({ checkOnLoad: false }));

    await act(async () => {
      expect(mockHealthCheck).not.toHaveBeenCalled();
    });
  });

  it('should set isHealthy to true if healthCheck returns true', async () => {
    mockHealthCheck.mockResolvedValue(true);

    const { result } = renderHook(() => useApiHealth({ checkOnLoad: false }));

    let isHealthy: boolean;
    await act(async () => {
      isHealthy = await result.current.checkApiHealth();
    });

    await act(async () => {
      expect(isHealthy).toBeTruthy();
    });
  });

  it('should set isHealthy to false if healthCheck returns false', async () => {
    mockHealthCheck.mockResolvedValue(false);

    const { result } = renderHook(() => useApiHealth({ checkOnLoad: false }));

    let isHealthy: boolean;
    await act(async () => {
      isHealthy = await result.current.checkApiHealth();
    });

    await act(async () => {
      expect(isHealthy).toBeFalsy();
    });
  });

  it('should reject if checkApiHealth receives an error', async () => {
    mockHealthCheck.mockRejectedValueOnce(new Error('error'));

    const { result } = renderHook(() => useApiHealth({ checkOnLoad: false }));

    const toThrow = async () => {
      await result.current.checkApiHealth();
    };

    await expect(toThrow).rejects.toThrowError();
  });

  it('should set isHealthy to true if setHealth is called with true', () => {
    const { result } = renderHook(() => useApiHealth());

    expect(result.current.isHealthy).toBe(true);

    result.current.setHealth(true);

    expect(result.current.isHealthy).toBe(true);
  });

  it('should set isHealthy to false if setHealth is called with false', () => {
    const { result } = renderHook(() => useApiHealth());

    expect(result.current.isHealthy).toBe(true);

    result.current.setHealth(false);

    expect(result.current.isHealthy).toBe(false);
  });
});
