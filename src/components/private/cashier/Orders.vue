<template>
    <div class="px-md-4">
      <TheHeader></TheHeader>


      <v-row class="mt-5">
        <v-col cols="12" md="9">
          <v-card height="620" class="d-flex flex-column pa-1 scrollable-card" style="overflow-y: auto;" flat >

            <v-row>
                <v-col v-for="order in orders" :key="order.id" cols="12" md="3">
                    <v-card height="87" class=" pa-1">
                        <h2>{{order.orderCode}}</h2>
                        <h4>R {{ order.totalAmount }}</h4>
                        <p class="orange--text">{{order.orderStatus}}</p>
                    </v-card>
                    
                </v-col>


            </v-row>

            </v-card>
        </v-col>

        <v-col col="12" md="3">
          <v-card height="620" class="pa-2 d-flex flex-column scrollable-card" style="overflow: hidden;">

            <div>
              <v-spacer></v-spacer> <v-btn class="red white--text" depressed>decline</v-btn>
            </div>
            <div style="overflow-y: auto; flex: 1;">
              <h2>Streetwise 2</h2>
              <div class="d-flex justify-space-between">
                  <label><strong>Price:</strong></label>
                  <span>R100</span>
                </div>
                <div class="d-flex justify-space-between">
                  <label><strong>Quantity:</strong></label>
                  <span>1</span>
                </div>

          <hr class="mb-3 mt-1">

          <div class="d-flex justify-space-between">
              <label><strong>Order:</strong></label>
              <span>78SD5</span>
          </div>
         
          <div class="d-flex justify-space-between">
              <label><strong>Payment Method:</strong></label>
              <span>Cash</span>
          </div>

          <div class="d-flex justify-space-between">
              <label><strong>Status:</strong></label>
              <span>Pending</span>
          </div>

          <div class="d-flex justify-space-between">
              <label><strong>Date:</strong></label>
              <span>2000/02/20</span>
          </div>
          
          <div class="d-flex justify-space-between">
              <label><strong>Total:</strong></label>
              <span>R 150.00</span>
          </div>

          <p class="mt-3">Here it must be the description of the order if the customer entered a description when they ordered.</p>

        </div>

        <div>
          <v-btn class="orange white--text mt-5" block>
            Accept
          </v-btn>
        </div>
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
    name: "OrdersPage",
  
    components: {
      TheHeader,
    },
  
    data: () => ({
      overlay: false,
      orders: [],

      storeId: 1,
    }),
  
    async created() {
      this.fetchOrders();
    },
  
    computed: {
    },

  
    methods: {
      // fetchOrders
      async fetchOrders() {
      try {
        const response = await apiService.getStoreOrder(this.storeId);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching store orders:', error);
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

.scrollable-card {
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
}

.scrollable-card::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Edge */
}
</style>
