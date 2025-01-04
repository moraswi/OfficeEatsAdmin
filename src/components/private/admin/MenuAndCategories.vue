<template>
    <div class="px-md-4">
      <TheHeader></TheHeader>

      <div class="d-flex mt-5" >
        <v-btn
          v-for="category in categories"
            :key="category.id"
            rounded
            class="ml-2"
            color="red"
            dark
            depressed
            @click="fetchMenu(category.id)"
            >
            {{ category.name }}
            </v-btn>
      </div>

      <v-row class="mt-5">
        <v-col v-for="menu in storeMenu" :key="menu.id" cols="12" md="4">
            <v-card  height="87" class=" pa-1">
                    <v-layout align-center>
                        <img src="@/assets/images/burgermeal.png" alt="face" height="80" class="image-rounded">
                        <div class="d-flex flex-column justify-center ml-2">
                            <h2>Streetwise</h2>
                            <label class="mt-n1">description</label>
                            <label class="mt-n1">R 40.00</label>
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
  import apiService from '@/http/apiService';
  
  export default {
    name: "MenuAnCategoriesPage",
  
    components: {
      TheHeader,
    },
  
    data: () => ({
      overlay: false,
      storeId: 0,
      categoryid:0,
      categories:[],
      storeMenu:[]
    }),
  
    async created() {
      await Promise.all([
        this.fetchMenuCategory(),
        this.fetchMenu(),

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
          // fetchMenuCategory
          async fetchMenuCategory() {
            try {
              this.overlay = true;

              const response = await apiService.getMenuCategory(this.storeId);
              this.categories = response.data;

              if(this.categories.length > 0){
                const firstCategoryId = this.categories[0].id;
                await this.fetchMenu(firstCategoryId);

              }
            } catch (error) {
              console.error('Error fetching store orders:', error);
            } finally {
              this.overlay = false;
            }
          },

          // fetchMenu
          async fetchMenu(categoryid) {
            try {
              this.overlay = true;
            // console.log('categoryid')
            // console.log(categoryid)
              const response = await apiService.getStoreMenuByCategory(categoryid);
              // console.log(response)
              this.storeMenu = response.data;
            } catch (error) {
              console.error('Error fetching store menu:', error);
            } finally {
              this.overlay = false;
            }
        },
    },
  };
  </script>
  
<style lang="scss" scoped>
.image-rounded {
    border-radius: 5px; /* Makes the image circular */
}

</style>
