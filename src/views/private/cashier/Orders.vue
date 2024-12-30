<template>
    <div>
      <Orders />
    </div>
  </template>
  
  <script>
  import Orders from "@/components/private/cashier/Orders";
  
  export default {
    name: "OrdersView",
    components: {
        Orders,
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  