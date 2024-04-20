import axios from "axios";

const baseUrl = "https://www.buda.com/api/v2";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
