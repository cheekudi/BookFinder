<template>
  <div>
    <SearchBar
      @search="performSearch"
      :default-query="defaultQuery"
    ></SearchBar>
    <BookDetails></BookDetails>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import BookDetails from "@/components/BookDetails.vue";
import { useBookStore } from "@/stores/book-data/store";

export default defineComponent({
  name: "HomeView",
  components: {
    SearchBar,
    BookDetails,
  },

  setup() {
    const store = useBookStore();
    const defaultQuery = "top selling books of all time";

    onMounted(() => {
      performSearch(defaultQuery);
    });
    const performSearch = (searchQuery: string) => {
      store.searchBooks(searchQuery);
    };

    return {
      performSearch,
      defaultQuery,
    };
  },
});
</script>
@/stores/book-data/store
