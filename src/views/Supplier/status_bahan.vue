<template>
  <AdminLayout>
    <template #header>
      <h1 class="text-2xl font-semibold">Status Bahan</h1>
    </template>
    <template #default>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Total Bahan Tersedia</h3>
            <p class="text-2xl font-bold">150 kg</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Total Kebutuhan Bahan</h3>
            <p class="text-2xl font-bold">340 kg</p>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Status Bahan</h3>
          <StatusPaketTable :columns="columns" :data="bahanData" />
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import StatusPaketTable from "@/components/tables/basic-tables/StatusPaketTable.vue";

const columns = [
  { title: 'No', key: 'no' },
  { title: 'Nama Bahan', key: 'namaBahan' },
  { title: 'Jumlah', key: 'jumlah' },
  { title: 'Satuan', key: 'satuan' },
  { title: 'Status', key: 'statusPaket' },
];

const bahanData = ref([
  { no: 1, namaBahan: 'Bahan A', jumlah: 100, satuan: 'kg', statusPaket: 'Sudah Diterima' },
  { no: 2, namaBahan: 'Bahan B', jumlah: 50, satuan: 'kg', statusPaket: 'Sedang Dikirim' },
  { no: 3, namaBahan: 'Bahan C', jumlah: 24, satuan: 'Ikat', statusPaket: 'Dibatalkan' },
  // Add more data as needed
]);
</script>

<style scoped>
/* Add any custom styles here */
</style>
