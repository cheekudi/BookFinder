import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import BookDetails from "../src/components/BookDetails.vue";
import Modal from "../src/components/Modal.vue";

const mockState = {
  books: [
    {
      id: "EjehEAAAQBAJ",
      title: "Rust Web Development",
      author: "Bastian Gruber",
      cover: "http://books.google.com/EjehEAAAQBAJ",
      description:
        "Create bulletproof, high-performance web apps and servers with Rust.",
    },
    {
      id: "xF_xAwAAQBAJ",
      title: "Enterprise Web Development",
      author: "Yakov Fain, Victor Rasputnis, Anatole Tartakovsky, Viktor Gamov",
      cover: "http://books.google.com/xF_xAwAAQBAJ",
      description:
        "If you want to build your organization’s next web application with HTML5, this practical book will help you sort through the various frameworks, libraries, and development options that populate this stack.",
    },
    {
      id: "eTkzEAAAQBAJ",
      title: "Go Web Programming",
      author: "Sau Sheong Chang",
      cover: "http://books.google.com/eTkzEAAAQBAJ",
      description:
        "Summary Go Web Programming teaches you how to build scalable, high-performance web applications in Go using modern design principles. ",
    },
  ],
  isLoading: false,
  selectedBook: null,
};

vi.mock("@/stores/book-data/store", () => ({
  useBookStore: vi.fn(() => ({
    get books() {
      return mockState.books;
    },
    get isLoading() {
      return mockState.isLoading;
    },
    get selectedBook() {
      return mockState.selectedBook;
    },
    selectBook: vi.fn((book) => {
      mockState.selectedBook = book;
    }),
  })),
}));
describe("BookDetails.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("displays book information", () => {
    const wrapper = mount(BookDetails, {
      global: {
        plugins: [createPinia()],
      },
    });

    // Check for the first book's details
    const book = mockState.books[0];
    expect(wrapper.text()).toContain(book.title);
    expect(wrapper.text()).toContain(book.author);
    expect(wrapper.find(`img[src="${book.cover}"]`).exists()).toBe(true);
  });

  it("opens the modal with book details when a book is clicked", async () => {
    const wrapper = mount(BookDetails, {
      global: {
        plugins: [createPinia()],
      },
    });

    // Simulate click on the first book
    await wrapper.findAll(".book")[0].trigger("click");

    // Assertions for the Modal component
    const modal = wrapper.findComponent(Modal);
    expect(modal.exists()).toBe(true);

    // Check for the selected book's details in the modal
    const selectedBook = mockState.books[0];
    expect(wrapper.html()).toContain(selectedBook.title);
    expect(wrapper.html()).toContain(selectedBook.author);
    expect(wrapper.html()).toContain(selectedBook.description);
  });
});
