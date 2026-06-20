import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { campaigns, notifications, transactions, wallet } from './data';
import { notFoundError, serverError, unauthenticatedError, validationError } from './errors';
import { mockHeaders, shouldFail, waitForMockLatency, type EndpointNetworkConfig } from './network';
import { paginateMock } from './pagination';
import type { MockMode } from './types';
import type { WithdrawPayload, WithdrawResult } from '@/features/wallet/types/wallet.types';
import { env } from '@/shared/lib/env';

export type MockRouteContext = {
  config: AxiosRequestConfig;
  url: URL;
  mode: MockMode;
  network: EndpointNetworkConfig;
};

type MockRoute = {
  method: 'GET' | 'POST';
  pathname: string;
  network?: EndpointNetworkConfig;
  resolver: (context: MockRouteContext) => Promise<AxiosResponse> | AxiosResponse;
};

const apiBaseUrl = env.EXPO_PUBLIC_API_URL ?? 'https://api.expin.com/api/v1';
const basePath = '/api/v1';

function response<T>(context: MockRouteContext, status: number, data: T): AxiosResponse<T> {
  return {
    data,
    status,
    statusText: String(status),
    headers: mockHeaders(context.network),
    config: context.config as InternalAxiosRequestConfig,
  };
}

function pageParam(url: URL) {
  return Number(url.searchParams.get('page') ?? '1') || 1;
}

function perPageParam(url: URL) {
  return Number(url.searchParams.get('per_page') ?? '15') || 15;
}

function parseBody<T>(config: AxiosRequestConfig): T {
  if (!config.data) return {} as T;
  return typeof config.data === 'string' ? JSON.parse(config.data) : (config.data as T);
}

const routes: MockRoute[] = [
  {
    method: 'GET',
    pathname: `${basePath}/wallet`,
    resolver: (context) => response(context, 200, { data: structuredClone(wallet) }),
  },
  {
    method: 'GET',
    pathname: `${basePath}/wallet/transactions`,
    resolver: (context) =>
      response(
        context,
        200,
        paginateMock(
          transactions,
          pageParam(context.url),
          perPageParam(context.url),
          `${apiBaseUrl}/wallet/transactions`,
        ),
      ),
  },
  {
    method: 'GET',
    pathname: `${basePath}/campaigns/active`,
    network: { failureRate: 0.03 },
    resolver: (context) =>
      response(
        context,
        200,
        paginateMock(
          campaigns,
          pageParam(context.url),
          perPageParam(context.url),
          `${apiBaseUrl}/campaigns/active`,
        ),
      ),
  },
  {
    method: 'GET',
    pathname: `${basePath}/notifications`,
    resolver: (context) => response(context, 200, { data: notifications }),
  },
  {
    method: 'POST',
    pathname: `${basePath}/wallet/withdraw`,
    network: { failureRate: 0.1 },
    resolver: (context) => {
      const payload = parseBody<Partial<WithdrawPayload> & { wallet_id?: string }>(context.config);
      const errors: Record<string, string[]> = {};
      if (payload.amount == null) errors.amount = ['The amount field is required.'];
      else if (payload.amount < 50) errors.amount = ['The amount must be at least 50.'];
      else if (payload.amount > wallet.balance.available)
        errors.amount = ['The amount may not be greater than the available balance.'];
      if (payload.currency && payload.currency !== 'AED')
        errors.currency = ['The selected currency is invalid.'];
      if (payload.wallet_id === 'invalid')
        errors.wallet_id = ['The selected wallet id is invalid.'];
      if (Object.keys(errors).length > 0) return response(context, 422, validationError(errors));

      wallet.balance.available = Math.max(0, wallet.balance.available - Number(payload.amount));
      wallet.balance.lastSyncedAt = new Date().toISOString();
      return response(context, 201, {
        data: {
          withdrawalId: `wd_${Date.now()}`,
          amount: Number(payload.amount),
          status: 'queued',
          createdAt: new Date().toISOString(),
        } satisfies WithdrawResult,
      });
    },
  },
];

export async function resolveMockRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
  const url = new URL(config.url ?? '/', config.baseURL ?? apiBaseUrl);
  const method = (config.method ?? 'GET').toUpperCase() as MockRoute['method'];
  const route = routes.find(
    (candidate) => candidate.method === method && candidate.pathname === url.pathname,
  );
  const network: EndpointNetworkConfig = {
    ...(route?.network ?? {}),
    profile: env.EXPO_PUBLIC_MOCK_NETWORK_PROFILE === 'slow-3g' ? 'slow-3g' : 'gcc',
    failureRate: Number(env.EXPO_PUBLIC_MOCK_FAILURE_RATE ?? route?.network?.failureRate ?? 0),
  };
  const context: MockRouteContext = {
    config,
    url,
    mode: env.EXPO_PUBLIC_MOCK_NOT_FOUND_MODE === 'production' ? 'production' : 'dev',
    network,
  };

  await waitForMockLatency(network);

  if (!config.headers?.Authorization && env.EXPO_PUBLIC_MOCK_REQUIRE_AUTH === 'true') {
    return response(context, 401, unauthenticatedError());
  }

  if (route && shouldFail(network.failureRate)) return response(context, 500, serverError());
  if (!route)
    return response(
      context,
      404,
      notFoundError('Campaign', url.pathname.split('/').at(-1) ?? 'unknown', context.mode),
    );

  return route.resolver(context);
}
