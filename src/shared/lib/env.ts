type ExpoEnv = {
  EXPO_PUBLIC_API_URL?: string;
  EXPO_PUBLIC_USE_MOCK_API?: string;
  EXPO_PUBLIC_MOCK_NETWORK_PROFILE?: string;
  EXPO_PUBLIC_MOCK_FAILURE_RATE?: string;
  EXPO_PUBLIC_MOCK_NOT_FOUND_MODE?: string;
  EXPO_PUBLIC_MOCK_REQUIRE_AUTH?: string;
};

declare const process: { env: ExpoEnv };

export const env = process.env;
