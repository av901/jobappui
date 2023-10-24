import axios from "axios";

let showQueries = true;

const axios1 = axios.create({
  baseURL: `http://localhost:8009`,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

axios1.interceptors.response.use(
  function (response) {
    if (response.data.query && showQueries) {
      console.log(response.config.url, response.data.query);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios1;
