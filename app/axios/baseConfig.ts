import axios from "axios";
// const API_URL = process.env.API_URL
const baseConfig = axios.create({
  baseURL: `https://backend-server-6191-2f1fe018-ktb0l1sg.onporter.run/api/v1`, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axios, baseConfig };
