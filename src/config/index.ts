export const config = {
  REST_API_URL: import.meta.env.VITE_REST_API_URL || "",
  IS_MOCK_ENABLE: import.meta.env.VITE_IS_MOCK_ENABLE === 'true',
};
