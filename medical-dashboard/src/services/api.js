import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:5001/api";

const api = axios.create({
  baseURL: apiBaseUrl
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("ai_med_token", token);
    return;
  }

  delete api.defaults.headers.common.Authorization;
  localStorage.removeItem("ai_med_token");
}

const savedToken = localStorage.getItem("ai_med_token");
if (savedToken) {
  setAuthToken(savedToken);
}

export default api;
