<template>
  <div>
    <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
      Input with Payment
    </label>
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="updateValue"
        placeholder="Card number"
        class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-[62px] text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
      />
      <span
        class="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
          <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
          <path
            d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
            fill="#FC6020"
          />
        </svg>
      </span>
    </div>
    <flat-pickr
      :modelValue="modelValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import FlatPickr from 'vue-flatpickr-component';
import type { DateOption } from 'flatpickr';

// Define the DateOption type
type DateOption = string | Date | number;

const props = defineProps<{
  modelValue: DateOption | DateOption[] | null;
}>();

const modelValue = ref(props.modelValue);

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
