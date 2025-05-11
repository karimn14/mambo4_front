<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div :class="{'blur-background': isModalOpen}" class="space-y-5 sm:space-y-6">
      <div class="flex justify-between items-center">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-bar" />
        <div class="filters">
          <!-- Add filter components here -->
        </div>
      </div>
      <CustomTable :columns="columns" :data="filteredItems" />
    </div>
    <div v-if="isModalOpen" class="modal-overlay">
      <Modal @close="isModalOpen = false">
        <template #header>Edit Bahan</template>
        <template #body>
          <form @submit.prevent="saveItem">
            <InputGroup label="Nama Bahan" :modelValue="form.name" @update:modelValue="form.name = $event" type="text" id="name" />
            <InputGroup label="Jumlah Stok" :modelValue="form.stock" @update:modelValue="form.stock = $event" type="number" id="stock" />
            <InputGroup label="Satuan" :modelValue="form.unit" @update:modelValue="form.unit = $event" type="text" id="unit" />
            <InputGroup label="Harga" :modelValue="form.harga" @update:modelValue="form.harga = $event" type="number" id="harga" />
            <div class="flex justify-end">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </template>
      </Modal>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, reactive, h } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import FilterComponent from "@/components/common/FilterComponent.vue";
import CustomTable from "@/components/tables/basic-tables/CustomTable.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import Modal from "@/components/vendor/Modal.vue"; // Ensure the Modal component is correctly imported
import InputGroup from "@/components/Vendor/InputGroup.vue"; // Import InputGroup component
import TextArea from "@/components/Vendor/TextArea.vue"; // Import TextArea component

const currentPageTitle = ref("Menu Bahan");
const searchQuery = ref("");
const selectedFilter = ref("");
const isModalOpen = ref(false); // Reactive reference for modal visibility
const isDarkMode = ref(false); // Reactive reference for dark mode

import axios from "axios";

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/mambo4/api/menu_supplier', {
      params: { id_user: 4 }
    });
    const data = response.data.daftar;
    items.value = data.map(item => ({
      id: item.id,
      name: item.nama_item,
      harga: item.harga,
      stock: item.volume,
      category: 'category1'
    }));
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

fetchItems();

const handleFilterChange = (filter) => {
  selectedFilter.value = filter;
};

const filteredItems = computed(() => {
  return items.value.filter(item => 
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (selectedFilter.value === "" || item.category === selectedFilter.value)
  );
});

const columns = ref([
  { title: "No", key: "id" },
  { title: "Nama Bahan", key: "name" },
  { title: "Jumlah Stok", key: "stock" },
  { title: "Satuan", key: "unit" },
  { title: "Harga", key: "harga" },
  { title: "Actions", key: "actions", render: (item) => {
      return h('button', {
        class: 'edit-button',
        onClick: () => editItem(item.id)
      }, [
        h('svg', { class: 'fill-current', width: 18, height: 18, viewBox: '0 0 18 18' }, [
          h('path', {
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            d: 'M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z',
            fill: ''
          })
        ]), ' Edit'
      ]);
    }
  }
]);

const form = reactive({
  id: null,
  name: '',
  stock: '',
  unit: '',
  harga: ''
});

const editItem = (id) => {
  const item = items.value.find(item => item.id === id);
  if (item) {
    form.id = item.id;
    form.name = item.name;
    form.stock = item.stock;
    form.unit = item.unit;
    form.harga = item.harga;
    isModalOpen.value = true; // Open the modal
  }
};

const saveItem = () => {
  const index = items.value.findIndex(item => item.id === form.id);
  if (index !== -1) {
    items.value[index] = { ...form };
  }
  isModalOpen.value = false; // Close the modal
};
</script>

<style scoped>
.search-bar {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
.edit-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #4a5568; /* Tailwind gray-600 */
}

.blur-background {
  filter: blur(5px);
  background-color:aqua;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(199, 42, 42, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
</style>
