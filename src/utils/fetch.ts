import { APIStatus } from '@/types/status';

type FetchOptions = {
  baseUrl?: string;
  prefetchUrl?: string;
};

export class Fetch {
  private readonly baseUrl: string | undefined;
  private readonly prefetchUrl: string | undefined;

  constructor(private props: FetchOptions) {
    this.baseUrl = props.baseUrl;
    this.prefetchUrl = props.prefetchUrl;
  }

  async fetch<T>(url: string, options: RequestInit): Promise<T> {
    if (this.prefetchUrl) {
      await this.healthCheck();
    }

    const link = this.baseUrl ? `${this.baseUrl}${url}` : url;
    console.log('again', link);
    const res = await fetch(link, options);
    console.log('other', res);
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
    });
    const body = await response.json();
    if (body.status !== APIStatus.OK) {
      return false;
    }

    return true;
  }
}
