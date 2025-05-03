<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <CustomTable :columns="columns" :data="items" />
    </div>
    <button @click="openInsertModal" class="theme-button">Insert New Kontrak</button>
    <div v-if="isModalOpen" class="modal-overlay">
      <Modal @close="isModalOpen = false">
        <template #header>Detail Kontrak</template>
        <template #body>
          <div class="space-y-4 overflow-y-auto max-h-96 space-x-4">
            <p><strong>Nama Sekolah:</strong> {{ modalData.school }}</p>
            <p><strong>Nama Paket:</strong> {{ modalData.package }}</p>
            <p><strong>Nama Vendor:</strong> {{ modalData.vendor }}</p>
            <p><strong>Nama:</strong> {{ modalData.name }}</p>
            <p><strong>NIP/NPWP:</strong> {{ modalData.nipNpwp }}</p>
            <p><strong>Jumlah Kalori:</strong> {{ modalData.calories }}</p>
            <p><strong>Jumlah Paket per Hari:</strong> {{ modalData.packagesPerDay }}</p>
            <p><strong>Tanggal Mulai:</strong> {{ modalData.startDate }}</p>
            <p><strong>Tanggal Selesai:</strong> {{ modalData.endDate }}</p>
            <p><strong>Durasi:</strong> {{ modalData.duration }}</p>
            <p><strong>Total Biaya Kontrak:</strong> {{ modalData.totalCost }}</p>
            <p><strong>Bukti Kontrak:</strong> <a :href="modalData.contractProof" download>Download</a></p>
          </div>
        </template>
      </Modal>
    </div>
    <div v-if="isInsertModalOpen" class="modal-overlay">
      <Modal @close="isInsertModalOpen = false">
        <template #header>Insert New Kontrak</template>
        <template #body>
          <form @submit.prevent="insertKontrak">
            <div class="space-y-4 overflow-y-auto max-h-96 space-x-4 p-y-1">
              <TextInput v-model="newKontrak.school" label="Nama Sekolah" required />
              <TextInput v-model="newKontrak.package" label="Nama Paket" required />
              <TextInput v-model="newKontrak.vendor" label="Nama Vendor" required />
              <TextInput v-model="newKontrak.name" label="Nama Pribadi (Vendor)" required />
              <TextInput v-model="newKontrak.nipNpwp" label="NIP/NPWP" required />
              <TextInput v-model="newKontrak.calories" label="Jumlah Kalori" required />
              <TextInput v-model="newKontrak.packagesPerDay" label="Jumlah Paket per Hari" required />
              <DatePickerInput v-model="newKontrak.startDate" label="Tanggal Mulai" required />
              <DatePickerInput v-model="newKontrak.endDate" label="Tanggal Selesai" required />
              <NumberInput v-model="newKontrak.totalCost" label="Total Biaya Kontrak" required />
              <FileInput v-model="newKontrak.contractProof" label="Bukti Kontrak" required />
            </div>
            <button type="submit" class="theme-button">Submit</button>
          </form>
        </template>
      </Modal>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, h } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import CustomTable from "@/components/tables/basic-tables/CustomTable.vue";
import Modal from "@/components/disdik/Modal.vue";
import TextInput from "@/components/forms/FormElements/inputs/TextInput.vue";
import DatePickerInput from "@/components/forms/FormElements/inputs/DatePickerInput.vue";
import NumberInput from "@/components/forms/FormElements/inputs/IDRInput.vue";
import FileInput from "@/components/forms/FormElements/FileInput.vue"; // Import FileInput

const currentPageTitle = ref("Kontrak");

const items = ref([
  // Sample data
  { id: 1, vendor: "Vendor A", school: "Sekolah A", package: "Paket A", duration: "12 bulan", cost: 1000000, name: "John Doe", nipNpwp: "123456789", calories: "2000", packagesPerDay: "3", startDate: "2023-01-01", endDate: "2023-12-31", totalCost: 12000000, contractProof: "/path/to/contractA.pdf" },
  { id: 2, vendor: "Vendor B", school: "Sekolah B", package: "Paket B", duration: "6 bulan", cost: 500000, name: "Jane Smith", nipNpwp: "987654321", calories: "1500", packagesPerDay: "2", startDate: "2023-06-01", endDate: "2023-12-01", totalCost: 3000000, contractProof: "/path/to/contractB.pdf" },
  // ...more items
]);

const columns = ref([
  { title: "No", key: "id" },
  { title: "Nama Vendor", key: "vendor" },
  { title: "Nama Sekolah", key: "school" },
  { title: "Nama Paket", key: "package" },
  { title: "Durasi", key: "duration" },
  { title: "Biaya Kontrak", key: "cost" },
  { title: "Actions", key: "actions", width: 150, render: (item) => {
    return h('button', {
        class: 'edit-button',
        onClick: () => seeMore(item.id)
      }, [
        h('svg', { class: 'fill-current', width: 18, height: 18, viewBox: '0 0 18 18' }, [
          h('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            d: 'M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z',
            fill: ''
          })
        ]), ' See More'
      ]);
    }
  }
]);

const isModalOpen = ref(false);
const isInsertModalOpen = ref(false);
const modalData = ref({});
const newKontrak = ref({
  school: '',
  package: '',
  vendor: '',
  name: '',
  nipNpwp: '',
  calories: '',
  packagesPerDay: '',
  startDate: '',
  endDate: '',
  duration: '',
  totalCost: '',
  contractProof: ''
});

const seeMore = (id) => {
  const item = items.value.find(item => item.id === id);
  if (item) {
    modalData.value = item;
    isModalOpen.value = true; // Open the modal
  }
};

const openInsertModal = () => {
  isInsertModalOpen.value = true;
};

const insertKontrak = () => {
  items.value.push({ ...newKontrak.value, id: items.value.length + 1 });
  isInsertModalOpen.value = false;
  newKontrak.value = {
    school: '',
    package: '',
    vendor: '',
    name: '',
    nipNpwp: '',
    calories: '',
    packagesPerDay: '',
    startDate: '',
    endDate: '',
    duration: '',
    totalCost: '',
    contractProof: ''
  };
};
</script>

<style scoped>
.see-more-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568; /* Tailwind gray-600 */
}

.blur-background {
  filter: blur(5px);
  background-color: aqua;
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
  z-index: 99999;
}

.modal-overlay .modal {
  max-height: 100vh;
  justify-self: center;
  overflow-y: auto;
  margin: auto; /* Center the modal */
}

.theme-button {
  background-color: #4a5568; /* Tailwind gray-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
