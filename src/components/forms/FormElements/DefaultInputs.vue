<template>
  <div class="space-y-6">
    <!-- Text Input -->
    <TextInput :modelValue="formData.input" @update:modelValue="formData.input = $event" />

    <!-- Input with Placeholder -->
    <InputWithPlaceholder :modelValue="formData.inputWithPlaceholder" @update:modelValue="formData.inputWithPlaceholder = $event" />

    <!-- Select Input -->
    <SelectInput :modelValue="formData.selectInput" @update:modelValue="formData.selectInput = $event" />

    <!-- Password Input -->
    <PasswordInput :modelValue="formData.password" :showPassword="showPassword" @update:modelValue="formData.password = $event" @togglePassword="showPassword = !showPassword" />

    <!-- Date Picker Input -->
    <DatePickerInput :modelValue="date" :config="flatpickrConfig" @update:modelValue="date = $event" />

    <!-- Time Select Input -->
    <TimeSelectInput :modelValue="time" :config="flatpickrTimeConfig" @update:modelValue="time = $event" />

    <!-- Input with Payment -->
    <InputWithPayment :modelValue="formData.cardNumber" @update:modelValue="formData.cardNumber = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import TextInput from './inputs/TextInput.vue'
import InputWithPlaceholder from './inputs/InputWithPlaceholder.vue'
import SelectInput from './inputs/SelectInput.vue'
import PasswordInput from './inputs/PasswordInput.vue'
import DatePickerInput from './inputs/DatePickerInput.vue'
import TimeSelectInput from './inputs/TimeSelectInput.vue'
import InputWithPayment from './inputs/InputWithPayment.vue'

const showPassword = ref(false)

const formData = reactive({
  input: '',
  inputWithPlaceholder: '',
  selectInput: '',
  password: '',
  date: '',
  time: '',
  cardNumber: '',
})

const date = ref<string>('')

const flatpickrConfig = {
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
  wrap: true,
}

const flatpickrTimeConfig = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: false,
  minuteIncrement: 1,
  wrap: false,
}

const time = ref<string>('')
</script>
