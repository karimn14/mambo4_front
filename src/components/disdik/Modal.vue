<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 50%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0; /* Tailwind gray-200 */
  padding-bottom: 0.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding-top: 1rem;
}
</style>
