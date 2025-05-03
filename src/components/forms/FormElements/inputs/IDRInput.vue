<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <div class="input-group">
      <span class="input-group-text">Rp.</span>
      <input
        :id="id"
        :type="type"
        :value="formattedValue"
        @input="updateValue($event.target.value)"
        :required="required"
        class="form-control"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "IDRInput",
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: () => `idr-input-${Math.random().toString(36).substr(2, 9)}`,
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedValue() {
      return this.formatCurrency(this.modelValue);
    },
  },
  methods: {
    updateValue(value) {
      const numericValue = value.replace(/[^0-9]/g, "");
      this.$emit("update:modelValue", numericValue);
    },
    formatCurrency(value) {
      if (!value) return "";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      })
        .format(value)
        .replace("Rp", "")
        .trim();
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-text {
  background-color: #e2e8f0; /* Tailwind gray-200 */
  border: 1px solid #cbd5e0; /* Tailwind gray-300 */
  padding: 0.5rem;
}

.form-control {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #cbd5e0; /* Tailwind gray-300 */
  border-radius: 0.375rem;
}
</style>
