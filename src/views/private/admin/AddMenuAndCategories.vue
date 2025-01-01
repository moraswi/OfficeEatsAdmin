<template>
    <div>
      <AddMenuAndCategories />
    </div>
  </template>
  
  <script>
  import AddMenuAndCategories from "@/components/private/admin/AddMenuAndCategories.vue";
  
  export default {
    name: "MenuAndCategoriesView",
    components: {
        AddMenuAndCategories,
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  