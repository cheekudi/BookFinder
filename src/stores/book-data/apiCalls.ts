import type { BookResponse } from "./types";
import api from "@/shared/interceptors";

// Get books data from Google Books API
export async function searchBooks(query: string): Promise<BookResponse> {
  return new Promise((resolve, reject) => {
    api
      .get(`/volumes?q=${query}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
