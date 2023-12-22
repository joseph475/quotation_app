import axios from 'axios';
import { API_ENDPOINTS } from './src/config/apiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const prefetch = () => {
  fetchDataFromAPI('supplier')
  fetchDataFromAPI('classification')
}

const fetchDataFromAPI = async (key) => {
  try {
    await axios.get(API_ENDPOINTS[`${key}s`])
      .then(response => {
        localStorage.setItem(`${key}s`, JSON.stringify(response.data));
        window.dispatchEvent(new Event("storage"));
      })
      .catch(error => {
        console.error(error);
      });
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw error;
  }
};

const storeData = async (key, data, method) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key, value]) => value !== null)
  );

  try {
    await axios[method](API_ENDPOINTS[key], filteredData)
      .then(() => {
        toast.success('Saved Succesfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        fetchDataFromAPI(key)
        return true;
      });

  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw error;
  }
};

const deleteData = async (id, key) => {
  try {
    const apiUrl = `${API_ENDPOINTS[key]}/${id}`;
    const response = await axios.delete(apiUrl);

    if (response.status >= 200 && response.status < 300) {
      fetchDataFromAPI(key)
      toast.success('Deleted successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error(response.status, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  } catch (error) {
    toast.error(error.message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
};

const fetchLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(`${key}s`);

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
  const isValid = fields.every((i) => (typeof data === 'string' ? data[i].trim() !== '' : data))
  return isValid;
};

export {
  prefetch,
  storeData,
  deleteData,
  validateForm,
  fetchLocalStorage,
  fetchDataFromAPI
};
