<template>
  <input 
    type="text" 
    :value="modelValue" 
    @input="updateValue" 
    placeholder="Search..." 
    class="input" 
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
