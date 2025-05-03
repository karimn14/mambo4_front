<template>
  <AdminLayout>
    <template #header>
      <h1 class="text-2xl font-semibold">Status Paket</h1>
    </template>
    <template #default>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Persentase Kesuksesan Pengiriman</h3>
            <p class="text-2xl font-bold">95%</p>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2">Jumlah Siswa Penerima Paket</h3>
            <p class="text-2xl font-bold">5,395</p>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-4">Status Paket</h3>
          <StatusPaketTable :columns="columns" :data="paketData" />
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
  { title: 'Nama Vendor', key: 'namaVendor' },
  { title: 'Jumlah Paket', key: 'jumlahPaket' },
  { title: 'Jenis Paket', key: 'jenisPaket' },
  { title: 'Status Paket', key: 'statusPaket' },
];

const paketData = ref([
  { no: 1, namaVendor: 'Vendor A', jumlahPaket: 100, jenisPaket: 'Type 1', statusPaket: 'Sudah Diterima' },
  { no: 2, namaVendor: 'Vendor B', jumlahPaket: 200, jenisPaket: 'Type 2', statusPaket: 'Sedang Dikirim' },
  // Add more data as needed
]);
</script>

<style scoped>
/* Add any custom styles here */
</style>
