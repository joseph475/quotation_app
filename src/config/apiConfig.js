// apiConfig.js
const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  "item": `${API_BASE_URL}/item`,
  "items": `${API_BASE_URL}/items`,
  "classification": `${API_BASE_URL}/classification`,
  "classifications": `${API_BASE_URL}/classifications`,
  "suppliers": `${API_BASE_URL}/suppliers`,
  "supplier_edit": `${API_BASE_URL}/supplier`,
  getSuppliers: `${API_BASE_URL}/suppliers`,
  storeItems: `${API_BASE_URL}/item`,
  getItems: `${API_BASE_URL}/items`,
  // Add more endpoints as needed
};