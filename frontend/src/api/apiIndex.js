/* eslint-disable no-undef */
import axios from "axios";

export const NODE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://growcomers-server.onrender.com"
    : "http://localhost:4000";
export const PYTHON_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://growcomersml.onrender.com"
    : "http://localhost:4002";

export const NODE_API = axios.create({
  baseURL: NODE_BASE_URL,
});

export const PYTHON_API = axios.create({
  baseURL: PYTHON_BASE_URL,
});

export const PRIVATE_API = axios.create({
  baseURL: NODE_BASE_URL,
});

export const PRIVATE_PYTHON_API = axios.create({
  baseURL: PYTHON_BASE_URL,
});

PRIVATE_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

PRIVATE_PYTHON_API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

