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
              <span v-if="column.key !== 'actions'">{{ item[column.key] }}</span>
              <span v-else>
                <component :is="column.render(item)"></component>
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