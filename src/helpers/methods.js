// @ts-nocheck
import axios from 'axios';
import { getApiEndpoints } from '@helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const prefetch = () => {
  fetchDataFromAPI('supplier')
  fetchDataFromAPI('classification')
  fetchDataFromAPI('model_')
  fetchDataFromAPI('brand')
}

const fetchDataFromAPI = async (key) => {
  console.log(key);
  try {
    await axios.get(getApiEndpoints(key))
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
    await axios[method](getApiEndpoints(`${key}`), filteredData)
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
    const apiUrl = `${getApiEndpoints(`${key}`)}/${id}`;
    const response = await axios.delete(apiUrl);
    
    if (response.data.status !== false) {
      fetchDataFromAPI(key)
      toast.success('Deleted successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.error(response.data.message, {
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

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
}

const validateForm = (fields, data) => {
  const isValid = fields.every((i) => (typeof data === 'string' ? data[i].trim() !== '' : data))
  return isValid;
};

// const lazyLoadComponent = async (path, cb) => {
//   const module = await import(path);
//   const lazyLoadedComponent = module.default;
//   return lazyLoadedComponent;
// }

export {
  prefetch,
  storeData,
  deleteData,
  validateForm,
  fetchLocalStorage,
  fetchDataFromAPI,
  setLocalStorage
  // lazyLoadComponent
};
