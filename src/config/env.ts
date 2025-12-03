export const config = {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT || '',
  apiReferer: import.meta.env.VITE_API_REFERER || '',
} as const;
