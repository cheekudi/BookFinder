<template>
  <div class="search-bar">
    <input
      id="search-input"
      name="search-input"
      type="text"
      placeholder="Search for books..."
      class="search-input form-control"
      v-model="searchQuery"
      @keyup.enter="onSearch"
    />
    <button @click="onSearch" class="button">Search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBar",
  components: {},
  props: {
    defaultQuery: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const searchQuery = ref(props.defaultQuery);
    const onSearch = () => {
      if (searchQuery.value.trim()) {
        emit("search", searchQuery.value);
      }
    };

    return {
      searchQuery,
      onSearch,
    };
  },
});
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.search-input {
  width: 50%;
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #2c3e50;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.2);
}
.search-input::placeholder {
  color: #999999;
  opacity: 1;
}

.search-input {
  background-image: url("@/assets/images/search-icon.svg");
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 35px;
}

@media (max-width: 600px) {
  /* Wider input field on smaller screens */
  .search-input {
    width: 80%;
  }
}
</style>
