<template>
  <div>
    <v-card class="main-card py-5 px-2 mt-5 hidden-sm-and-down">
     <v-layout>
      <h2>Office Eats</h2>
      <v-spacer></v-spacer>
      <v-btn :to="{ name: 'Orders' }" class="ml-5" rounded depressed>Home</v-btn>
      <v-btn :to="{ name: 'AddMenuAndCategories' }" class="ml-5" rounded depressed>Add Items</v-btn>
      <v-btn :to="{ name: 'MenuAndCategories' }" class="ml-5" rounded depressed>Menu</v-btn>
      <v-btn :to="{ name: 'AdminOrders' }" class="ml-5" rounded depressed>Manage Orders</v-btn>
      <v-btn :to="{ name: 'home' }" class="ml-5 red white--text" rounded depressed>Log Out</v-btn>

    </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  membername: "HeaderPage",

  props: {
    title: String,
  },

  data: () => ({}),
};
</script>
<style lang="scss" scoped>
//
.main-card {
  background: #fcfcfc;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
  //box-shadow: 5px 10px red;
  border-radius: 16px;
}
</style>
