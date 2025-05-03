<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="form-input dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
}
</style>
