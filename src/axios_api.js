import axios from 'axios';
import cors from 'cors'

const axios_api = axios.create({
  baseURL: 'http://localhost:3000', // Set your API base URL
  withCredentials: true, // Include credentials (cookies) with requests
  headers: {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") !== null
        ? `Bearer ${localStorage.getItem("token")}`
        : undefined,
  },
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

axios_api.defaults.xsrfCookieName = 'csrftoken';
axios_api.defaults.xsrfHeaderName = "X-CSRFToken";
axios_api.defaults.withCredentials = true;


export default axios_api;