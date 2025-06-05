import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  timeout: 50000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
