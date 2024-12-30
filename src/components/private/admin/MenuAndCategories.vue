<template>
    <div class="px-md-4">
      <TheHeader title="Announcements"></TheHeader>

      <v-layout class="mt-5">
        <v-btn
            rounded
            color="red"
            dark
            depressed
            >
            Box Meal
            </v-btn>

            <v-btn
            rounded
            color="red"
            dark
            depressed
            class="ml-3"
            >
            Drinks
            </v-btn>
      </v-layout>

      <v-row class="mt-5">
        <v-col cols="12" md="4">
            <v-card height="87" class=" pa-1">
                    <v-layout align-center>
                        <img src="@/assets/images/burgermeal.png" alt="face" height="80" class="image-rounded">
                        <div class="d-flex flex-column justify-center ml-2">
                            <h2>Streetwise</h2>
                            <label class="mt-n1">description</label>
                        </div>
                        <v-spacer></v-spacer>
                        <v-icon
                            color="red"
                            >
                            mdi-delete
                            </v-icon>
                    </v-layout>
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
    name: "MenuAnCategoriesPage",
  
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
