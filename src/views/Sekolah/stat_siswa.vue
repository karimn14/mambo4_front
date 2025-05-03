<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" :items="breadcrumbItems" />
    <div>
      <CustomTable :columns="tableHeaders" :data="studentList" />
      <button @click="showInputForm" class="theme-button">Tambah Siswa Baru</button>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import CustomTable from '@/components/tables/basic-tables/CustomTable.vue';

export default {
  components: {
    AdminLayout,
    PageBreadcrumb,
    CustomTable,
  },
  data() {
    return {
      breadcrumbItems: [
        { text: 'Home', to: '/' },
        { text: 'Sekolah', to: '/sekolah' },
        { text: 'Student Details', active: true },
      ],
      currentPageTitle: `Siswa Kelas ${this.$route.params.kelas}`,
      tableHeaders: [
        { title: 'No', key: 'no' },
        { title: 'Nama Siswa', key: 'nama' },
        { title: 'Gender', key: 'gender' },
        { title: 'Tinggi Badan', key: 'tinggiBadan' },
        { title: 'Berat Badan', key: 'beratBadan' }
      ],
      studentList: [
        { no: 1, nama: 'John Doe', gender: 'Male', tinggiBadan: '170 cm', beratBadan: '60 kg' },
        { no: 2, nama: 'Jane Doe', gender: 'Female', tinggiBadan: '160 cm', beratBadan: '55 kg' },
        // Add more students as needed
      ],
    };
  },
  methods: {
    showInputForm() {
      // Logic to display the input form for the current month
      alert('Display input form for this month');
    },
  },
};
</script>

<style scoped>
.theme-button {
  background-color: #4a5568; /* Tailwind gray-600 */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>