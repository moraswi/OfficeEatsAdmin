<template>
    <div class="px-md-4">
      <TheHeader title="Announcements"></TheHeader>


      <v-row class="mt-5">
        <v-col cols="12" md="9">
            <v-row>
                <v-col cols="12" md="3">
                    <v-card height="87" class=" pa-1">
                        <h2>1C45</h2>
                        <h4>R 40.00</h4>
                        <p class="orange--text">Pending</p>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col col="12" md="3">
            <v-card height="560" class=" pa-1">
                  
            </v-card>
        </v-col>
      </v-row>
  
      <v-overlay :value="overlay" z-index="1000">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </template>
  
  <script>
  import TheHeader from "@/components/shared/TheHeader.vue";
  
  export default {
    name: "OrdersPage",
  
    components: {
      TheHeader,
    },
  
    data: () => ({
      overlay: false,
    }),
  
    async created() {
      await Promise.all([
  
      ])
        .then(() => {
          this.overlay = false;
        })
        .catch(() => {
          this.overlay = false;
        });
    },
  
    computed: {
    },
  
    methods: {
    },
  };
  </script>
  
<style lang="scss" scoped>
.image-rounded {
    border-radius: 5px; /* Makes the image circular */
}

</style>
