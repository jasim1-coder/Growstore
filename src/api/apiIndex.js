import axios from "axios";

export const NODE_BASE_URL = "http://localhost:4000";

export const API = axios.create({
  baseURL: NODE_BASE_URL,
});

export const PRIVATE_API = axios.create({
  baseURL: NODE_BASE_URL,
});

PRIVATE_API.interceptors.request.use((req) => {
  if (localStorage.getItem("accessToken")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("accessToken")
    )}`;
  }
  return req;
});
