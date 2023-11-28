<template>
  <div class="modal" @click="handleOutsideClick">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <button class="close-button" @click="closeModal">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    function closeModal() {
      emit("close");
    }

    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target?.classList?.contains("modal")) {
        closeModal();
      }
    }

    return {
      closeModal,
      handleOutsideClick,
    };
  },
});
</script>

<style scoped>
/* Modal Classes */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  animation-name: modalopen;
  animation-duration: 0.4s;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
  color: #2c3e50;
}

.close-button:hover {
  color: #000;
}

/* Animation */
@keyframes modalopen {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
