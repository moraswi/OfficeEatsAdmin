<template>
    <div>
      <AdminOrders />
    </div>
  </template>
  
  <script>
  import AdminOrders from "@/components/private/admin/AdminOrders.vue";
  
  export default {
    name: "MenuAndCategoriesView",
    components: {
        AdminOrders,
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  