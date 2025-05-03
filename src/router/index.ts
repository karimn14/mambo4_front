import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Ecommerce',
      component: () => import('../views/Ecommerce.vue'),
      meta: {
        title: 'Home Page',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Account/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
        path: '/signin',
        name: 'Signin',
        component: () => import('../views/Auth/Signin.vue'),
        meta: {
          title: 'Signin',
        },
      },
      {
        path: '/proses_pesanan',
        name: 'Proses Pesanan',
        component: () => import('../views/Vendor/proses_pesanan.vue'),
        meta: {
          title: 'Proses Pesanan',
        },
      },
      {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/Others/Calendar.vue'),
      meta: {
        title: 'Calendar',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('../views/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    
    {
      path: '/pesan_supplier',
      name: 'Pesan Supplier',
      component: () => import('../views/Vendor/pesan_supplier.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('../views/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('../views/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('../views/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('../views/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('../views/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('../views/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('../views/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('../views/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('../views/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },

    {
      path: '/error-404',
      name: '404 Error',
      component: () => import('../views/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },
    
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
    {
      path: '/menu_paket',
      name: 'Menu Paket',
      component: () => import('../views/Vendor/menu_paket.vue'),
      meta: {
        title: 'Menu Paket',
      },
    },
    {
      path: '/menu_bahan',
      name: 'Menu Bahan',
      component: () => import('../views/Supplier/menu_bahan.vue'),
      meta: {
        title: 'Menu Bahan',
      },
    },
    {
      path: '/list_kontrak',
      name: 'List Kontrak',
      component: () => import('../views/Disdik/list_kontrak.vue'),
      meta: {
        title: 'List Kontrak',
      },
    },
    {
      path: '/menu_vendor',
      name: 'Menu Vendor',
      component: () => import('../views/Disdik/menu_vendor.vue'),
      meta: {
        title: 'Menu Vendor',
      },
    },
    {
      path: '/status_paket',
      name: 'Status Paket',
      component: () => import('../views/Disdik/status_paket.vue'),
      meta: {
        title: 'Status Paket',
      },
    },
    {
      path: '/status_bahan',
      name: 'Status Bahan',
      component: () => import('../views/Supplier/status_bahan.vue'),
      meta: {
        title: 'Status Bahan',
      },
    },
    {
      path: '/kelas',
      name: 'Kelas Siswa',
      component: () => import('../views/Sekolah/kelas_siswa.vue'),
      meta: {
        title: 'Kelas Siswa',
      },
    },
    {
      path: '/stat-siswa/:kelas',
      name: 'StatSiswa',
      component: () => import('../views/Sekolah/stat_siswa.vue'),
      meta: {
        title: 'Student Details',
      },
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})
