<template>
  <div class="px-md-4">
    <TheHeader></TheHeader>


    <v-row class="mt-5">

      <!-- orders -->
      <v-col cols="12" md="9">
        <v-card max-height="620" class="d-flex flex-column pa-1 scrollable-card" style="overflow-y: auto;" flat >

          <v-data-table
            :headers="headers"
            :items="processedOrders"
            item-key="date"
            items-per-page="13"
            class="mt-7"
          >

     <!-- date -->
      <template v-slot:[`item.orderDate`]="{ item }">
        <FormattedDate :date="item.orderDate" />
      </template>

      <template v-slot:[`item.orderStatus`]="{ item }">
        <v-chip
          :color="item.latestStatus === 'Pending' ? 'orange' : 'green'"
          text-color="white"
        >
          {{ item.latestStatus }}
        </v-chip>
      </template>


      <template  v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-2" color="orange" @click="fetchOrdersDetails(item.id)">
          mdi-eye
        </v-icon>
      </template> 
    </v-data-table>

        </v-card>
      </v-col>

      <v-col col="12" md="3">
        <v-card height="620" class="pa-2 d-flex flex-column scrollable-card" style="overflow: hidden;">
      
          <div v-if="orderDetails.items" style="overflow-y: auto; flex: 1;">
          
            <!-- order items -->
          <div v-for="orderItems in orderDetails.items" :key="orderItems.id">
            <h3>{{ orderItems.foodName }}</h3>
            <div class="d-flex justify-space-between">
                <label><strong>Price:</strong></label>
                <span>R {{ orderItems.totalPrice }}</span>
            </div>
            <div class="d-flex justify-space-between">
                <label><strong>Quantity:</strong></label>
                <span>{{ orderItems.quantity }}</span>
            </div>

            <!-- Order Customazation -->
          <h4 >Order Customazation</h4>
          <ul>
            <li>ss</li>
            <li>ss</li>
          </ul>

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
            <FormattedDate :date="orderDetails.orderDate" />
        </div>
        
        <div class="d-flex justify-space-between">
            <label><strong>Total:</strong></label>
            <span>R {{orderDetails.totalAmount}}</span>
        </div>

        <p class="mt-3">{{orderDetails.description}}</p>

    <div class="grey pa-2">
      <h3>Delivery Address:</h3>
                  <!-- RecipientName -->
        <div class="d-flex justify-space-between">
            <label><strong>RecipientName:</strong></label>
            <span> {{orderDetails.recipientName}}</span>
        </div>


                  <!-- Province -->
        <div class="d-flex justify-space-between">
            <label><strong>Province:</strong></label>
            <span> {{orderDetails.province}}</span>
        </div>

        <!-- Town -->
        <div class="d-flex justify-space-between">
            <label><strong>Town:</strong></label>
            <span> {{orderDetails.town}}</span>
        </div>

        <!-- Apartment -->
        <div class="d-flex justify-space-between">
            <label><strong>Apartment:</strong></label>
            <span> {{orderDetails.apartment}}</span>
        </div>

        <!-- StreetAddress -->
        <div class="d-flex justify-space-between">
            <label><strong>StreetAddress:</strong></label>
            <span> {{orderDetails.streetAddress}}</span>
        </div>

        <!-- PostalCode -->
        <div class="d-flex justify-space-between">
            <label><strong>PostalCode:</strong></label>
            <span> {{orderDetails.postalCode}}</span>
        </div>



        <!-- Suburb -->
        <div class="d-flex justify-space-between">
            <label><strong>Suburb:</strong></label>
            <span> {{orderDetails.suburb}}</span>
        </div>
      </div>
        <!-- <hr class="mb-3 mt-1"> -->
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
import FormattedDate from "@/components/shared/AppShared.vue";
export default {
  name: "OrdersPage",

  components: {
    TheHeader,
    FormattedDate,
  },

  data: () => ({
    overlay: false,
    orders: [],
    orderDetails: {},
    orderStatus: "",
    storeId: 12,

    headers: [
      { text: "Order", align: "start", value: "orderCode" },
      { text: "Total Amount", value: "totalAmount" },
      { text: "Date", value: "orderDate" },
      { text: "Town", value: "town" },
      { text: "Province", value: "province" },
      { text: "Apartment", value: "apartment" },
      { text: "Street", value: "streetAddress" },
      { text: "Status", value: "orderStatus" },

      { text: "Suburb", value: "suburb" },

      { text: "Action", value: "action" },
    ],
  }),

  async created() {
    this.fetchOrders();
  },

  computed: {
  processedOrders() {
    return this.orders.map(order => {
      const latestStatus = order.orderStatusHistory.length
        ? order.orderStatusHistory[order.orderStatusHistory.length - 1].status
        : order.orderStatus; // Fallback to orderStatus if history is empty

      return {
        ...order,
        latestStatus
      };
    }) .sort((a, b) => b.id - a.id);
  }
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
    }
      
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
