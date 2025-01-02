<template>
    <div class="px-md-4">
      <TheHeader></TheHeader>


      <v-row class="mt-5">
        <v-col cols="12" md="9">
          <v-card height="620" class="d-flex flex-column pa-1 scrollable-card" style="overflow-y: auto;" flat >

            <v-row>
                <v-col v-for="order in orders" :key="order.id" cols="12" md="3">
                    <v-card @click="fetchOrdersDetails(order.id)" height="87" class=" pa-1">
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
              <v-spacer></v-spacer> <v-btn @click="updateOrders" class="red white--text" depressed>decline</v-btn>
            </div>
            <div style="overflow-y: auto; flex: 1;">
              <!-- order items -->
              <div v-for="orderItems in orderDetails.items" :key="orderItems.id">
              <h2>{{ orderItems.foodName }}</h2>
              <div class="d-flex justify-space-between">
                  <label><strong>Price:</strong></label>
                  <span>R {{ orderItems.totalPrice }}</span>
                </div>
                <div class="d-flex justify-space-between">
                  <label><strong>Quantity:</strong></label>
                  <span>{{ orderItems.quantity }}</span>
                </div>

          <hr class="mb-3 mt-1">
        </div>

        <!-- order details -->
          <div class="d-flex justify-space-between">
              <label><strong>Order:</strong></label>
              <span>{{orderDetails.orderCode}}</span>
          </div>
         
          <div class="d-flex justify-space-between">
              <label><strong>Payment Method:</strong></label>
              <span>{{orderDetails.paymentMethod}}</span>
          </div>

          <div class="d-flex justify-space-between">
              <label><strong>Status:</strong></label>
              <span>{{orderDetails.orderStatus}}</span>
          </div>

          <div class="d-flex justify-space-between">
              <label><strong>Date:</strong></label>
              <span>{{orderDetails.orderDate}}</span>
          </div>
          
          <div class="d-flex justify-space-between">
              <label><strong>Total:</strong></label>
              <span>R {{orderDetails.totalAmount}}</span>
          </div>
          <hr class="mb-3 mt-1">

          <p class="mt-3">{{orderDetails.description}}</p>

        </div>

        <div>
          <v-btn @click="updateOrders" class="orange white--text mt-5" block>
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
      orderDetails: {},

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
        this.overlay = true;

        const response = await apiService.getStoreOrder(this.storeId);
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching store orders:', error);
      } finally {
        this.overlay = false;
      }
    },

    // fetchOrdersDetails
    async fetchOrdersDetails(orderId) {
      try {
        this.overlay = true;
        console.log(orderId);

        const response = await apiService.getStoreOrderById(orderId);
        this.orderDetails = response.data;
      } catch (error) {
        console.error('Error fetching store orders:', error);
      } finally {
        this.overlay = false;
      }
    },

    
    // updateOrders
    async updateOrders() {
      try {
        this.overlay = true;

        console.log('here')
        console.log(this.orderDetails.id);

        const data = {
                id: this.orderDetails.id, // Order ID
                userId: this.orderDetails.userId, // User ID
                items: this.orderDetails.items.map(item => ({
                  id: item.id,
                  foodId: item.foodId,
                  quantity: item.quantity,
                  itemPrice: item.itemPrice,
                  foodName: item.foodName,
                })), // Map items array
                totalAmount: this.orderDetails.totalAmount, // Total amount
                deliveryAddress: this.orderDetails.deliveryAddress, // Delivery address
                paymentMethod: this.orderDetails.paymentMethod, // Payment method
                orderStatus: this.orderDetails.orderStatus, // Order status
                orderDate: this.orderDetails.orderDate, // Order date
                shopId: this.orderDetails.shopId, // Shop ID
                orderCode: this.orderDetails.orderCode, // Order code
                storeName: this.orderDetails.storeName, // Store name
                description: this.orderDetails.description, // Description
              };

        const response = await apiService.updateOrder(data);

        if(response.status == 200){
    
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Successfully updated",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

      }
        // this.orderDetails = response.data;
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
