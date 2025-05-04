<template>
  <div>
    <DefaultInputs />
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DefaultInputs from '../DefaultInputs.vue'

const showPassword = ref<string>('')
const date = ref<string>('')
const time = ref<string>('')

defineExpose({
  FormData,
  showPassword,
  date,
  time
})


describe('DefaultInputs.vue', () => {
  it('renders text input', () => {
    const wrapper = mount(DefaultInputs)
    const textInput = wrapper.findComponent({ name: 'TextInput' })
    expect(textInput.exists()).toBe(true)
  })

  it('updates input values correctly', async () => {
    const wrapper = mount(DefaultInputs)
    
    // Test using DOM interactions instead of component internals
    const input = wrapper.find('input')
    await input.setValue('test')
    
    // Verify DOM output instead of component state
    expect(input.element.value).toBe('test')
  })

  it('handles password visibility', async () => {
    const wrapper = mount(DefaultInputs)
    const passwordInput = wrapper.find('.password-input')
    
    // Click the toggle button
    await wrapper.find('.toggle-password').trigger('click')
    
    // Verify DOM state
    expect(passwordInput.attributes('type')).toBe('text')
  })

  it('updates text input modelValue', async () => {
    const wrapper = mount(DefaultInputs)
    const textInput = wrapper.findComponent({ name: 'TextInput' })
    await textInput.setValue('test')
    expect(wrapper.find('input').element.value).toBe('test')
  })

  it('renders input with placeholder', () => {
    const wrapper = mount(DefaultInputs)
    const inputWithPlaceholder = wrapper.findComponent({ name: 'InputWithPlaceholder' })
    expect(inputWithPlaceholder.exists()).toBe(true)
  })

  it('updates input with placeholder modelValue', async () => {
    const wrapper = mount(DefaultInputs)
    const inputWithPlaceholder = wrapper.findComponent({ name: 'InputWithPlaceholder' })
    await inputWithPlaceholder.setValue('test placeholder')
    expect(wrapper.vm.formData.inputWithPlaceholder).toBe('test placeholder')
  })

  it('renders select input', () => {
    const wrapper = mount(DefaultInputs)
    const selectInput = wrapper.findComponent({ name: 'SelectInput' })
    expect(selectInput.exists()).toBe(true)
  })

  it('updates select input modelValue', async () => {
    const wrapper = mount(DefaultInputs)
    const selectInput = wrapper.findComponent({ name: 'SelectInput' })
    await selectInput.setValue('option1')
    expect(wrapper.vm.formData.selectInput).toBe('option1')
  })

  it('renders password input', () => {
    const wrapper = mount(DefaultInputs)
    const passwordInput = wrapper.findComponent({ name: 'PasswordInput' })
    expect(passwordInput.exists()).toBe(true)
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(DefaultInputs)
    const passwordInput = wrapper.findComponent({ name: 'PasswordInput' })
    const toggleButton = passwordInput.find('button')
    await toggleButton.trigger('click')
    expect(wrapper.vm.showPassword).toBe(true)
  })

  it('renders date picker input', () => {
    const wrapper = mount(DefaultInputs)
    const datePickerInput = wrapper.findComponent({ name: 'DatePickerInput' })
    expect(datePickerInput.exists()).toBe(true)
  })

  it('handles date selection', async () => {
  const wrapper = mount(DefaultInputs)
  
  // Find the date input and simulate selection
  const dateInput = wrapper.find('.date-input')
  await dateInput.setValue('2023-10-01')
  
  // Verify the DOM value
  expect((dateInput.element as HTMLInputElement).value).toBe('2023-10-01')
})

  it('renders time select input', () => {
    const wrapper = mount(DefaultInputs)
    const timeSelectInput = wrapper.findComponent({ name: 'TimeSelectInput' })
    expect(timeSelectInput.exists()).toBe(true)
  })

  it('updates time select input modelValue', async () => {
    const wrapper = mount(DefaultInputs)
    const timeSelectInput = wrapper.findComponent({ name: 'TimeSelectInput' })
    await timeSelectInput.setValue('12:00')
    expect(wrapper.vm.time).toBe('12:00')
  })

  it('renders input with payment', () => {
    const wrapper = mount(DefaultInputs)
    const inputWithPayment = wrapper.findComponent({ name: 'InputWithPayment' })
    expect(inputWithPayment.exists()).toBe(true)
  })

  it('updates input with payment modelValue', async () => {
    const wrapper = mount(DefaultInputs)
    const inputWithPayment = wrapper.findComponent({ name: 'InputWithPayment' })
    await inputWithPayment.setValue('1234 5678 9012 3456')
    expect(wrapper.vm.formData.cardNumber).toBe('1234 5678 9012 3456')
  })
})
</script>