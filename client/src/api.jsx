import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const connecUrl = axios.create({
  baseURL: apiUrl,
});