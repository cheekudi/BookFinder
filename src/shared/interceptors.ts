import axios from "axios";
import { showError } from "./utils";

const api = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let userMessage = "An unexpected error occurred. Please try again later.";

    if (error.response) {
      // Handle HTTP errors
      switch (error.response.status) {
        case 404:
          userMessage = "Requested resource not found.";
          break;
        case 500:
          userMessage = "Server error. Please try again later.";
          break;
        default:
          userMessage = `Error occurred: ${status}`;
          break;
      }
    } else if (error.request) {
      userMessage = "Network error. Please check your connection.";
    }

    console.error(error);
    showError(userMessage);
    return Promise.reject(error);
  }
);

export default api;
