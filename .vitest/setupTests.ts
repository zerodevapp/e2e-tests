import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
axios.interceptors.request.use(
  function (config) {
    config.headers["X-API-KEY"] = process.env.API_KEY;
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
