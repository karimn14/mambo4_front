<template>
  <AdminLayout>
    <template #header>
      <h1 class="text-2xl font-semibold">Status Paket</h1>
    </template>
    <template #default>
      <div :class="{ 'blur-background': showModal }">
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
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
            <h3 class="text-lg font-semibold mb-4">Detail Status Paket</h3>
            <div>
              <div class="border-b">
                <button class="w-full text-left py-4 px-5 font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between" @click="toggleAccordion(1)">
                  <span>Status: Delivered</span>
                  <ChevronDownIcon class="w-5 h-5" />
                </button>
                <div v-show="activeAccordion === 1" class="px-5 py-4">
                  <StatusPaketTable :columns="columnsForStatusPaketTable" :data="filteredData('Diterima')" />
                </div>
              </div>
              <div class="border-b">
                <button class="w-full text-left py-4 px-5 font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between" @click="toggleAccordion(2)">
                  <span>Status: In Transit</span>
                  <ChevronDownIcon class="w-5 h-5" />
                </button>
                <div v-show="activeAccordion === 2" class="px-5 py-4">
                  <ActionStatusTable
                    :columns="columnsForStatusPaketTable"
                    :data="filteredData('Diproses')"
                    :action-label="'Kirim'"
                    @action="({ item }) => openModal('Kirim', item.no)"
                  />
                </div>
              </div>
              <div class="border-b">
                <button class="w-full text-left py-4 px-5 font-medium text-gray-700 hover:bg-gray-100 flex items-center justify-between" @click="toggleAccordion(3)">
                  <span>Status: Pending</span>
                  <ChevronDownIcon class="w-5 h-5" />
                </button>
                <div v-show="activeAccordion === 3" class="px-5 py-4">
                  <ActionStatusTable
                    :columns="columnsForStatusPaketTable"
                    :data="filteredData('Pending')"
                    :action-label="'Terima'"
                    @action="({ item }) => openModal('Terima', item.no)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4">Status Paket</h3>
            <StatusPaketTable :columns="columnsForStatusPaketTable" :data="paketData" />
          </div>
        </div>
      </div>
      <div v-if="showModal" class="modal-overlay">
        <Modal @close="closeModal">
          <template #header>Konfirmasi</template>
          <template #body>
            <p class="mb-4">{{ modalMessage }}</p>
            <div class="flex justify-end space-x-4">
              <button class="px-4 py-2 bg-gray-300 rounded" @click="confirmAction(true)">Tidak</button>
              <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="confirmAction">Ya</button>
            </div>
          </template>
        </Modal>
      </div>
    </template>
  </AdminLayout>
</template>

<script setup>
import { ref, h, computed } from 'vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import CustomTable from "@/components/tables/basic-tables/CustomTable.vue";
import StatusPaketTable from "@/components/tables/basic-tables/StatusPaketTable.vue";
import ActionStatusTable from "@/components/tables/basic-tables/ActionStatusTable.vue";
import ChevronDownIcon from '@/icons/ChevronDownIcon.vue';
import Modal from '@/components/disdik/Modal.vue';
import axios from 'axios';


const columns = [
  { title: 'No', key: 'no' },
  { title: 'Nama Sekolah', key: 'namaSekolah' },
  { title: 'Tanggal', key: 'Tanggal' },
  { title: 'Jumlah Paket', key: 'jumlahPaket' },
  { title: 'Jenis Paket', key: 'jenisPaket' },
  {
    title: 'Status Paket',
    key: 'statusPaket',
    render: (column, item) => {
      return h('span', {
        class: [
          'rounded-full px-2 py-0.5 text-theme-xs font-medium',
          {
            'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500': item[column.key] === 'Diterima',
            'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400': item[column.key] === 'Dikirim' || item[column.key] === 'Diproses',
            'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500': item[column.key] === 'Dibatalkan',
            'bg-gray-50 text-gray-800 dark:bg-gray-500/15 dark:text-gray-500': item[column.key] === 'Pending',
          },
        ]
      }, item[column.key]);
    }
  }
];

// Columns for StatusPaketTable (no render function)
const columnsForStatusPaketTable = [
  { title: 'No', key: 'no' },
  { title: 'Nama Sekolah', key: 'namaSekolah' },
  { title: 'Tanggal', key: 'Tanggal' },
  { title: 'Jumlah Paket', key: 'jumlahPaket' },
  { title: 'Jenis Paket', key: 'jenisPaket' },
  { title: 'Status Paket', key: 'statusPaket' }
];

const filteredColumns = columns.filter(column => column.key !== 'namaVendor');

const kirimColumns = computed(() => [
  { title: 'No', key: 'no' },
  { title: 'Nama Sekolah', key: 'namaSekolah' },
  { title: 'Tanggal', key: 'Tanggal' },
  { title: 'Jumlah Paket', key: 'jumlahPaket' },
  { title: 'Jenis Paket', key: 'jenisPaket' },
  {
    title: 'Status Paket',
    key: 'statusPaket',
    render: (column, item) => {
      return h('span', {
        class: [
          'rounded-full px-2 py-0.5 text-theme-xs font-medium',
          {
            'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500': item[column.key] === 'Diterima',
            'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400': item[column.key] === 'Dikirim' || item[column.key] === 'Diproses',
            'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500': item[column.key] === 'Dibatalkan',
            'bg-gray-50 text-gray-800 dark:bg-gray-500/15 dark:text-gray-500': item[column.key] === 'Pending',
          },
        ]
      }, item[column.key]);
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, item) => {
      return h('button', {
        class: 'action-button',
        onClick: () => openModal('Kirim', item.no)
      }, 'Kirim');
    }
  }
]);

const terimaColumns = computed(() => [
  { title: 'No', key: 'no' },
  { title: 'Nama Sekolah', key: 'namaSekolah' },
  { title: 'Tanggal', key: 'Tanggal' },
  { title: 'Jumlah Paket', key: 'jumlahPaket' },
  { title: 'Jenis Paket', key: 'jenisPaket' },
  {
    title: 'Status Paket',
    key: 'statusPaket',
    render: (column, item) => {
      return h('span', {
        class: [
          'rounded-full px-2 py-0.5 text-theme-xs font-medium',
          {
            'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500': item[column.key] === 'Diterima',
            'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400': item[column.key] === 'Dikirim' || item[column.key] === 'Diproses',
            'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500': item[column.key] === 'Dibatalkan',
            'bg-gray-50 text-gray-800 dark:bg-gray-500/15 dark:text-gray-500': item[column.key] === 'Pending',
          },
        ]
      }, item[column.key]);
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, item) => {
      return h('button', {
        class: 'action-button',
        onClick: () => openModal('Terima', item.no)
      }, 'Terima');
    }
  }
]);

const activeAccordion = ref(null);
const showModal = ref(false);
const modalMessage = ref('');
const selectedRow = ref(null);
const selectedItem = ref(null); // Store the full item for action
const selectedAction = ref(''); // Store the action type

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

const openModal = (action, rowId) => {
  selectedAction.value = action;
  // Find the item by rowId (which is 'no')
  const item = paketData.value.find(i => i.no === rowId);
  selectedItem.value = item;
  selectedRow.value = rowId;
  modalMessage.value = action === 'Terima' ? 'Terima pengajuan paket ini?' : 'Kirim pesanan paket ini?';
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedRow.value = null;
  selectedItem.value = null;
  selectedAction.value = '';
};

const confirmAction = async (isCancel = false) => {
  if (isCancel && selectedAction.value === 'Terima' && selectedItem.value) {
    try {
      const id = selectedItem.value.id;
      const id_vendor = selectedItem.value.id_vendor || 1;
      await axios.put(`http://localhost:8000/mambo4/api/terima_pengajuan?id=${id}&approve=false&id_vendor=${id_vendor}`);
      await fetchPaketData();
      alert('Status dibatalkan');
    } catch (error) {
      alert('error', error);
      console.error('Error cancelling pengajuan:', error);
    }
    closeModal();
    return;
  } else if (isCancel == False && selectedAction.value === 'Terima' && selectedItem.value) {
    try {
      // Use the correct id and id_vendor from the selected item
      const id = selectedItem.value.id; // Use 'id' instead of 'id_pengajuan'
      const id_vendor = selectedItem.value.id_vendor || 1;
      await axios.put(`http://localhost:8000/mambo4/api/terima_pengajuan?id=${id}&approve=true&id_vendor=${id_vendor}`);
      await fetchPaketData();
      alert('data updated')
    } catch (error) {
      alert('error', error)
      console.error('Error approving pengajuan:', error);
    }}
  closeModal();
};

const paketData = ref([]);

const filteredData = (status) => {
  return paketData.value.filter(item => item.statusPaket === status);
};


const fetchPaketData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/mambo4/api/status_paket_vendor?id_user=5');
    paketData.value = response.data.status_paket.map((item, index) => ({
      no: index + 1,
      id: item.id, // Use 'id' instead of 'id_pengajuan'
      id_vendor: item.id_vendor, // Store vendor ID if available
      namaVendor: item.nama_vendor,
      namaSekolah: item.nama_sekolah,
      jumlahPaket: item.jumlah_paket, 
      jenisPaket: item.nama_paket,
      Tanggal: item.ts_dibuat,
      statusPaket: item.status,
    }));
  } catch (error) {
    console.error('Error fetching paket data:', error);
  }
};

fetchPaketData();
</script>

<style scoped>
.blur-background {
  filter: blur(5px);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
}
/* Add any custom styles here */
</style>
