<template>
  <AdminLayout>
    <PageBreadcrumb :items="breadcrumbItems" />
    <div>
      <h1>Student Details for Kelas {{ $route.params.kelas }}</h1>
      <CustomTable :columns="columns" :data="studentList" />
      <button @click="showInputForm">Input Data for This Month</button>
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
      columns: [
        { key: 'no', title: 'No' },
        { key: 'nama', title: 'Nama Siswa' },
        { key: 'gender', title: 'Gender' },
        { key: 'tinggiBadan', title: 'Tinggi Badan' },
        { key: 'beratBadan', title: 'Berat Badan' },
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
