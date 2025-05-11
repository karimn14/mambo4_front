<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <div class="flex justify-between items-center">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-bar" />
        <div class="filters">
          <!-- Add filter components here -->
        </div>
      </div>
      <CustomTable :columns="columns" :data="filteredVendors" />
    </div>
    <div v-if="isDetailModalOpen" class="modal-overlay">
      <Modal @close="isDetailModalOpen = false">
        <template #header>Detail Menu</template>
        <template #body>
          <div class="space-y-5 overflow-y-auto max-h-110 overflow-x-hidden">
            <CustomTable :columns="menuColumns" :data="selectedVendorMenu" />
          </div>
        </template>
      </Modal>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, h } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import CustomTable from "@/components/tables/basic-tables/CustomTable.vue";
import Modal from "@/components/disdik/Modal.vue"; // Updated import

const currentPageTitle = ref("Menu Paket");

const searchQuery = ref("");
const isDetailModalOpen = ref(false);
const selectedVendorMenu = ref([]);

const vendors = ref([
  { id: 1, name: "Vendor A", address: "Jl. A No. 1", city: "Kota A", capacity: "1000", menu: [
    { package: "Paket A1", details: "Detail A1", calories: 500, price: "Rp 50.000", capacityPerDay: 100, menuContent: "Nasi, Ayam Goreng, Sayur" },
    { package: "Paket A2", details: "Detail A2", calories: 600, price: "Rp 60.000", capacityPerDay: 200, menuContent: "Nasi, Ikan Bakar, Sayur" }
  ]},
  { id: 2, name: "Vendor B", address: "Jl. B No. 2", city: "Kota B", capacity: "500", menu: [
    { package: "Paket B1", details: "Detail B1", calories: 550, price: "Rp 55.000", capacityPerDay: 150, menuContent: "Nasi, Ayam Bakar, Sayur" },
    { package: "Paket B2", details: "Detail B2", calories: 650, price: "Rp 65.000", capacityPerDay: 250, menuContent: "Nasi, Ikan Goreng, Sayur" }
  ]},
  // ...more vendors
]);

const columns = ref([
  { title: "Nama Vendor", key: "name" },
  { title: "Alamat", key: "address" },
  { title: "Kota", key: "city" },
  { title: "Kapasitas", key: "capacity" },
  { title: "", key: "actions", width: 10, render: (vendor) => {
    return h('button', {
        class: 'detail-button',
        onClick: () => showDetailMenu(vendor)
      }, [
        h('svg', { class: 'fill-current', width: 23, height: 18, viewBox: '0 0 18 18' }, [
          h('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            d: 'M6 4L10 8L6 12',
            fill: ''
          })
        ])
      ]);
    }
  }
]);

const menuColumns = ref([
  { title: "Paket", key: "package" },
  { title: "Detail", key: "details" },
  { title: "Jumlah Kalori", key: "calories" },
  { title: "Harga", key: "harga" },
  { title: "Kapasitas per Hari", key: "capacityPerDay" },
  { title: "Isi Menu", key: "menuContent" }
]);

const filteredVendors = computed(() => {
  return vendors.value.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    vendor.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    vendor.city.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const showDetailMenu = (vendor) => {
  selectedVendorMenu.value = vendor.menu;
  isDetailModalOpen.value = true;
};
</script>

<style scoped>
.search-bar {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.filters {
  display: flex;
  gap: 1rem;
}

.detail-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568; /* Tailwind gray-600 */
}

.modal-overlay {
  position: fixed; /* Changed back to fixed */
  top: 0; /* Reset top to 0 */
  left: 0; /* Reset left to 0 */
  width: 100%; /* Reset width to 100% */
  height: 100%; /* Reset height to 100% */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal-overlay .modal {
  width: 100%; /* Adjust width to fit within the overlay */
  max-height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling if needed */
  overflow-x: hidden;
}
</style>
