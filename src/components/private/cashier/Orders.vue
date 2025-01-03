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

        <div v-if="orderDetails.items" class="mb-1">
            <v-spacer></v-spacer> 
            <v-btn
              v-if="nextStatus"
              @click="updateOrders('Decline')" 
              class="red white--text" 
              depressed>decline
          </v-btn>
        </div>
            <div v-if="orderDetails.items" style="overflow-y: auto; flex: 1;">
            
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

        <div v-if="orderDetails.items">
          <v-btn
            v-if="nextStatus"
            :disabled="overlay"
            @click="updateOrders(orderDetails.orderStatus)"
            :class="`${getButtonColor()} white--text mt-1`"
            block
          >
            {{ nextStatus }}
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
      orderStatus: "",
      storeId: 1,
    }),
  
    async created() {
      this.fetchOrders();
    },
  
    computed: {
      nextStatus() {
        const statusMapping = {
          Pending: "Accept",
          Accepted: "Complete",
        };
        return statusMapping[this.orderDetails.orderStatus] || null;
      },
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
    async updateOrders(currentStatus) {
      try {
        this.overlay = true;
        
        const statusMapping = {
          Pending: "Accepted",
          Accepted: "Completed",
          Decline: "Declined",
        };

        this.orderStatus = statusMapping[currentStatus] || currentStatus;

        const data = {
                id: this.orderDetails.id,
                userId: this.orderDetails.userId,
                items: this.orderDetails.items.map(item => ({
                  id: item.id,
                  foodId: item.foodId,
                  quantity: item.quantity,
                  itemPrice: item.itemPrice,
                  foodName: item.foodName,
                })),
                // items: this.orderDetails.items.map((item, index) => ({
                //   id: item.id,
                //   foodId: item.foodId,
                //   quantity: item.quantity,
                //   itemPrice: item.itemPrice,
                //   foodName: `${item.foodName} (item ${index})`, // Add an identifier
                // })),
                totalAmount: this.orderDetails.totalAmount,
                deliveryAddress: this.orderDetails.deliveryAddress,
                paymentMethod: this.orderDetails.paymentMethod,
                orderStatus: this.orderStatus,
                orderDate: this.orderDetails.orderDate,
                shopId: this.orderDetails.shopId,
                orderCode: this.orderDetails.orderCode,
                storeName: this.orderDetails.storeName,
                description: this.orderDetails.description,
              };

        const response = await apiService.updateOrder(data);

        this.orderDetails.orderStatus = this.orderStatus;

        if(response.status == 200){
    
          this.orderDetails.orderStatus = this.orderStatus;
          this.fetchOrders()
      
        // this.$swal({
        //   toast: true,
        //   position: "top-end",
        //   icon: "success",
        //   title: "Successfully updated",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        // });

      }
        
      } catch (error) {
        console.error('Error fetching store orders:', error);
      } finally {
        this.overlay = false;
      }
    },

    // getButtonColor
    getButtonColor() {
        const colorMapping = {
          Accept: "orange",
          Complete: "green",
        };
        return colorMapping[this.nextStatus] || "red";
      },

    },
  };
  </script>
  
<style lang="scss" scoped>
.image-rounded {
    border-radius: 5px;
}

.scrollable-card {
  overflow-y: auto;
  scrollbar-width: none;
}

.scrollable-card::-webkit-scrollbar {
  display: none;
}
</style>
