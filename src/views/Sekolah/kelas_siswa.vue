<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle"/>
    <div>
      <div class="mb-2">
        <div class="flex justify-around">
          <span>Nama Kelas</span>
          <span>Jumlah Siswa</span>
          <span>Tanggal Modifikasi Terakhir</span>
        </div>
        <hr class="my-2"/>
      </div>
      <div v-for="kelas in kelasList" :key="kelas.name" class="mb-4">
        <ViewButton variant="outline" class="px-2 w-full text-left tracking-wider hover:shadow-md" @click="redirectToDetails(kelas.name)">
          <div class="flex justify-around w-full">
            <span>{{ kelas.name }}</span>
            <span>{{ kelas.studentCount }} Siswa</span>
            <span>{{ kelas.lastModified }}</span>
          </div>
        </ViewButton>
      </div>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from '@/components/layout/AdminLayout.vue';
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import ViewButton from "@/components/ui/Button.vue";

export default {
  components: {
    AdminLayout,
    PageBreadcrumb,
    ViewButton,
  },
  data() {
    return {
      currentPageTitle: 'Kelas',
      kelasList: [
        { name: 'VII', studentCount: 30, lastModified: '2023-10-01' },
        { name: 'VIII', studentCount: 28, lastModified: '2023-10-02' },
        { name: 'IX', studentCount: 32, lastModified: '2023-10-03' },
      ],
    };
  },
  methods: {
    redirectToDetails(kelas) {
      this.$router.push({ name: 'StatSiswa', params: { kelas } });
    },
  },
};
</script>