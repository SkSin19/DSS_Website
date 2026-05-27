import axios from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"}/api/v1`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiGet<T>(url: string, config = {}) {
  return api.get<T>(url, config);
}

export async function apiPost<T>(url: string, data?: unknown, config = {}) {
  return api.post<T>(url, data, config);
}

export async function apiPut<T>(url: string, data?: unknown, config = {}) {
  return api.put<T>(url, data, config);
}

export async function apiDelete<T>(url: string, config = {}) {
  return api.delete<T>(url, config);
}

export default api;