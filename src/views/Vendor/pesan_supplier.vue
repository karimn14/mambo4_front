<template>
    <AdminLayout>
      <PageBreadcrumb :pageTitle="currentPageTitle" />
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <ComponentCard title="Default Inputs">
          <DefaultInputs />
        </ComponentCard>
        <BasicTableOne />

      </div>

    </AdminLayout>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
  import AdminLayout from "@/components/layout/AdminLayout.vue";
  import ComponentCard from "@/components/common/ComponentCard.vue";
  import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";
  import DefaultInputs from '@/components/forms/FormElements/DefaultInputs.vue';

  const currentPageTitle = ref("Pesan Supplier");
  </script>
  