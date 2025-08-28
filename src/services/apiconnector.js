// src/api/apiconnector.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "");

// If you want axios to prepend the base automatically in production:
const axiosInstance = axios.create({
  baseURL: BASE_URL || undefined,
  // don't set multipart/form-data globally
  // let individual requests set Content-Type when uploading files
  withCredentials: true,
});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  try {
    console.log("📤 Request →", method, url);
    console.log("📨 Payload:", bodyData);
    console.log("📨 Headers being sent:", headers);

    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    });

    console.log("📥 Response:", response);
    return response;
  } catch (error) {
    console.error("❌ API Error:", error);
    if (error.response) {
      console.error("❌ Error Response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("❌ No Response Received:", error.request);
    } else {
      console.error("❌ Setup Error:", error.message);
    }
    throw error;
  }
};

