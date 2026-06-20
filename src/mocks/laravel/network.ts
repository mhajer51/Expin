import type { MockResponseHeaders, NetworkProfile } from './types';

export type EndpointNetworkConfig = {
  failureRate?: number;
  profile?: NetworkProfile;
  rateLimit?: number;
  rateLimitRemaining?: number;
  nextCursor?: string;
};

const ranges: Record<NetworkProfile, [number, number]> = {
  gcc: [300, 900],
  'slow-3g': [1_200, 3_500],
};

export function delayFor(profile: NetworkProfile = 'gcc') {
  const [min, max] = ranges[profile];
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function shouldFail(failureRate = 0) {
  return Math.random() < Math.max(0, Math.min(1, failureRate));
}

export function mockHeaders(config: EndpointNetworkConfig = {}): MockResponseHeaders {
  return {
    'X-RateLimit-Limit': String(config.rateLimit ?? 60),
    'X-RateLimit-Remaining': String(config.rateLimitRemaining ?? 59),
    ...(config.nextCursor ? { 'X-Next-Cursor': config.nextCursor } : {}),
  };
}

export async function waitForMockLatency(config: EndpointNetworkConfig = {}) {
  await new Promise((resolve) => setTimeout(resolve, delayFor(config.profile)));
}
