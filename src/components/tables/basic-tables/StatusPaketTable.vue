<template>
  <div
    class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
  >
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th v-for="column in columns" :key="column.key" :class="['px-5 py-3 text-left sm:px-6', columnClass]">
              <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">{{ column.title }}</p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(item, index) in data" :key="index" class="border-t border-gray-100 dark:border-gray-800">
            <td v-for="column in columns" :key="column.key" :class="['px-5 py-4 sm:px-6', columnClass, 'dark:text-white']">
              <span v-if="column.key !== 'statusPaket'">{{ item[column.key] }}</span>
              <span v-else>
                <span
                    :class="[
                    'rounded-full px-2 py-0.5 text-theme-xs font-medium',
                    {
                      'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500': item[column.key] === 'Sudah Diterima',
                      'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400': item[column.key] === 'Sedang Dikirim' || item[column.key] === 'Disetujui',
                      'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500': item[column.key] === 'Dibatalkan',
                    },
                  ]"
                >
                  {{ item[column.key] }}
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

const columnClass = computed(() => {
  return `w-${Math.floor(12 / props.columns.length)}/12`;
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
