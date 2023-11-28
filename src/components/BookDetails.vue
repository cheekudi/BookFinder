<template>
  <div class="bookshelf-container">
    <div class="bookshelf">
      <div class="books-container">
        <div v-if="isLoading" class="loader"></div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-if="!isLoading && !books">No books found</div>
        <div
          class="book"
          v-for="book in books"
          :key="book.id"
          @click="showDetails(book)"
        >
          <img
            :src="book.cover"
            :alt="`Cover of ${book.title}`"
            class="book-cover"
          />
          <div class="book-info">
            <div class="book-title">{{ book.title }}</div>
            <p class="book-author">{{ book.author }}</p>
          </div>
        </div>
      </div>
    </div>
    <ModalComponent v-if="showModal && selectedBook" @close="showModal = false">
      <div class="book-title">{{ selectedBook.title }}</div>
      <div class="book-author">
        {{ selectedBook.author }}
      </div>
      <p v-if="selectedBook.description">{{ selectedBook.description }}</p>
    </ModalComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useBookStore } from "@/stores/book-data/store";
import type { Book } from "@/stores/book-data/types";
import Modal from "./Modal.vue";

export default defineComponent({
  components: {
    ModalComponent: Modal,
  },
  setup() {
    const bookStore = useBookStore();
    const books = computed(() => bookStore.books);
    const isLoading = computed(() => bookStore.isLoading);
    const selectedBook = computed(() => bookStore.selectedBook);
    const error = computed(() => bookStore.error);
    const showModal = ref(false);

    function showDetails(book: Book) {
      bookStore.selectBook(book);
      showModal.value = true;
    }

    return {
      books,
      isLoading,
      selectedBook,
      showModal,
      error,
      showDetails,
    };
  },
});
</script>

<style scoped>
.bookshelf-container {
  background-color: #f9f8f6;
  padding: 20px;
  margin: 20px 40px;
  border-radius: 8px;
}

.bookshelf {
  max-width: 1200px;
  margin: auto;
}

.bookshelf h2 {
  margin-bottom: 20px;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
}

.book {
  max-width: 125px;
  flex-shrink: 0;
  text-align: center;
  cursor: pointer;
}

.book-cover {
  width: 100px;
  height: 150px;
  aspect-ratio: auto 100 / 150;
  object-position: center;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.book-title {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 800;
}

.book-author {
  font-size: 14px;
  color: #666;
}

.error-message {
  color: red;
}
</style>
