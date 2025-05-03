<template>
  <div class="flex space-x-2">
    <select :value="modelValue" @change="applyFilter" class="select">
      <option value="">All</option>
      <option value="category1">Category 1</option>
      <option value="category2">Category 2</option>
      <!-- Add more options as needed -->
    </select>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const applyFilter = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
