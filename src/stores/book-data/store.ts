import { defineStore } from "pinia";
import type { Book, BookResponse } from "./types";
import { searchBooks } from "./apiCalls";

export const useBookStore = defineStore("books", {
  state: () => ({
    books: [] as Book[],
    isLoading: false,
    selectedBook: null as Book | null,
    error: null as string | null,
  }),
  actions: {
    async searchBooks(query: string) {
      this.books = [];
      this.error = null;
      this.isLoading = true;
      try {
        const data: BookResponse = await searchBooks(query);
        this.books = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo?.title ?? "",
          author: item.volumeInfo?.authors
            ? item.volumeInfo?.authors.join(", ")
            : "",
          cover: item.volumeInfo?.imageLinks?.thumbnail ?? "",
          description:
            item.volumeInfo?.description ?? item.searchInfo?.textSnippet ?? "",
          publishedDate: item.volumeInfo?.publishedDate ?? "",
          publisher: item.volumeInfo?.publisher ?? "",
          pageCount: item.volumeInfo?.pageCount ?? "",
        }));
      } catch (error) {
        console.error("Error fetching books:", error);
        this.error =
          typeof error === "string"
            ? error
            : error instanceof Error
            ? error.message
            : "An unknown error occurred";
      } finally {
        this.isLoading = false;
      }
    },

    selectBook(book?: Book) {
      this.selectedBook = book ?? null;
    },
  },
});
