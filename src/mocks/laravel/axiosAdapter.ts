import type { AxiosAdapter } from 'axios';
import { AxiosError } from 'axios';
import { resolveMockRequest } from './handlers';

export const laravelMockAxiosAdapter: AxiosAdapter = async (config) => {
  const response = await resolveMockRequest(config);
  const validateStatus = config.validateStatus ?? ((status) => status >= 200 && status < 300);
  if (validateStatus(response.status)) return response;

  throw new AxiosError(
    `Request failed with status code ${response.status}`,
    AxiosError.ERR_BAD_RESPONSE,
    config,
    undefined,
    response,
  );
};
