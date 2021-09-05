import axios from "axios";

const environment = process.env.NODE_ENV || "development";

const instance = axios.create({
  baseURL:
    environment === "development"
      ? process.env.REACT_APP_API_URL_LOCAL
      : process.env.REACT_APP_API_URL,
});

export default instance;
