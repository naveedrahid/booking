import axios from 'axios';
import Cookies from 'js-cookie';

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});


const handleResponse = async (response) => {
    if (response.status === 401) {
        Cookies.remove("token");
        Cookies.remove("username");
        window.location.href = "/login";
    } else if(response.status === 506){
        const results = response.data?.results || {};
        for (let key in results) {
            if (results.hasOwnProperty(key)){
                console.error(results[key]);
            }
        }
    }else if(!response.status.toString().startsWith("2")){
        console.info("Something went wrong");
    }
    return response;
}

const get = (url, config = {}) => apiInstance.get(url, config).then(handleResponse);
const post = (url, data, config = {}) => apiInstance.post(url, data, config).then(handleResponse);
const put = (url, data, config = {}) => apiInstance.put(url, data, config).then(handleResponse);
const patch = (url, data, config = {}) => apiInstance.patch(url, data, config).then(handleResponse);
const deleteRequest = (url, config = {}) => apiInstance.delete(url, config).then(handleResponse);

export const ApiService = {
  get,
  post,
  put,
  patch,
  deleteRequest,
};