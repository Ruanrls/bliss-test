import { APIStatus } from '@/types/status';

type FetchOptions = {
  baseUrl?: string;
  prefetchUrl?: string;
};

export class Fetch {
  private readonly baseUrl: string | undefined;
  private readonly prefetchUrl: string | undefined;
  private readonly abortController: AbortController;

  constructor(private props: FetchOptions) {
    this.baseUrl = props.baseUrl;
    this.prefetchUrl = props.prefetchUrl;
    this.abortController = new AbortController();
  }

  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    if (this.prefetchUrl) {
      await this.healthCheck();
    }

    const link = this.baseUrl ? `${this.baseUrl}${url}` : url;
    const res = await fetch(link, {
      ...options,
      signal: this.abortController.signal,
    });
    return await res.json();
  }

  async healthCheck(): Promise<boolean> {
    if (!this.prefetchUrl) {
      throw new Error('No prefetch url provided');
    }

    const link = `${this.prefetchUrl}`;

    const response = await fetch(link, {
      method: 'GET',
      cache: 'no-store',
      signal: this.abortController.signal,
    });
    const body = await response.json();
    if (body.status !== APIStatus.OK) {
      return false;
    }

    return true;
  }

  async abort(reason?: string) {
    this.abortController.abort(reason);
    return this.abortController.signal;
  }
}
