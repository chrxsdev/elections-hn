export const config = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT || '',
  apiReferer: import.meta.env.VITE_API_REFERER || '',
  defaultRefreshInterval: Number(import.meta.env.VITE_DEFAULT_REFRESH_INTERVAL) || 5,
} as const;
