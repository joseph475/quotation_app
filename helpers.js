// api.js
import axios from 'axios';
import { API_ENDPOINTS } from './src/config/apiConfig';

const prefetch = () => {
  fetchDataFromAPI('suppliers')
  fetchDataFromAPI('classifications')
}

const fetchDataFromAPI = async (key) => {
  try {
    await axios.get(API_ENDPOINTS[key])
      .then(response => {
        localStorage.setItem(key, JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
};

const storeData = async (storeEndpoint, fetchEndpoint, data, key) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== null)
  );

  try {
    await axios.post(storeEndpoint, filteredData)
      .then(() => {
        fetchData(fetchEndpoint).then((response) => {
          localStorage.setItem(key, JSON.stringify(response));
          window.dispatchEvent(new Event("storage"));
        })
        return true;
      });

  } catch (error) {
    console.error('Error storing data:', error.message);
    throw error;
  }
};

const fetchLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      const parsedData = JSON.parse(data)
      return parsedData
    } else {
      console.log('No data found in local storage.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from local storage:', error);
    return null;
  }
}

const validateForm = (fields, data) => {
  const isValid = fields.every((i) => data[i].trim() !== '');
  return isValid;
};

// const checkStorageReady = (keys) => {
//   try {
//     const allExist = keys.every((key) => localStorage.getItem(key) !== null);
//     return allExist;
//   } catch (error) {
//     console.error('Error checking local storage data:', error);
//     return false;
//   }
// }

export {
  prefetch,
  fetchData,
  storeData,
  validateForm,
  fetchLocalStorage,
  fetchDataFromAPI
};
