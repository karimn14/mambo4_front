<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="flex justify-between items-center p-4 border-b">
        <h3 class="text-lg font-medium text-gray-900">
          <slot name="header"></slot>
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['show']);
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
