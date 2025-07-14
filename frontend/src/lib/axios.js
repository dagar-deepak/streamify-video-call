import axios from "axios";

// Set base URL based on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies (useful for sessions/auth)
});
