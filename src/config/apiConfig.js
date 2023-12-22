// apiConfig.js
const API_BASE_URL = 'http://localhost:8000/api';

export const getApiEndpoints = (key) => {
  return `${API_BASE_URL}/${key}`
}