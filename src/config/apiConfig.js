// apiConfig.js
const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  "items": `${API_BASE_URL}/items`,
  "classifications": `${API_BASE_URL}/classifications`,
  getSuppliers: `${API_BASE_URL}/suppliers`,
  storeItems: `${API_BASE_URL}/item`,
  getItems: `${API_BASE_URL}/items`,
  // Add more endpoints as needed
};