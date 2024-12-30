<template>
  <div>
    <v-card class="main-card py-5 px-2 hidden-sm-and-down">
      <h1 class="font-h3" :style="{ color: '#20505d' }">Header</h1>
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
