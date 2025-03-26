<template>
    <div class="px-md-4">
      <TheHeader></TheHeader>


      <v-row class="mt-5">

        <!-- orders -->
        <v-col cols="12" md="9">
          <v-card max-height="620" class="d-flex flex-column pa-1 scrollable-card" style="overflow-y: auto;" flat >

            <v-row>
                <v-col v-for="order in orders" :key="order.id" cols="12" md="3">
                    <v-card @click="fetchOrdersDetails(order.id)" height="120" class=" pa-1">
                        <h3>{{order.orderCode}}</h3>
                        <h4>R {{ order.totalAmount + order.deliveryFee  }}</h4>
                        <label> {{ order.recipientName  }}</label>
                        <p class="orange--text">{{currentStatus(order)}}</p>
                    </v-card>
                </v-col>
            </v-row>
          
          </v-card>
        </v-col>

        <v-col col="12" md="3">
          <v-card height="620" class="pa-2 d-flex flex-column scrollable-card" style="overflow: hidden;">

            <!-- decline button -->
        <div v-if="orderDetails.items" class="mb-1">
            <v-spacer></v-spacer> 
            <v-btn
              v-if="nextStatus"
              @click="addOrderStatusReq(orderDetails.id)"
              class="red white--text" 
              depressed>decline
          </v-btn>
        </div>
        
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
              <span> <FormattedDate :date="orderDetails.orderDate" /> </span>
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

        </div>

        <div v-if="orderDetails.items">
          <v-btn
            v-if="nextStatus"
            :disabled="overlay"
            @click="addOrderStatusReq(orderDetails.id)"
            class="orange white--text mt-1"
            block
          >
            {{ nextStatus }}
          </v-btn>
        </div>

        
          <div v-if="showChatSection" class="chat-section">
          <v-card class="chat-card" style="position: fixed; bottom: 70px; right: 20px; width: 300px;">
            <v-card-title>Chat</v-card-title>
            <v-card-text style="max-height: 300px; overflow-y: auto;">
              <div v-for="(message, index) in messages" :key="index">
                <div :class="{'text-left': userId !== message.userId, 'text-right': userId === message.userId}">

                  <p>{{ message.message }}</p>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-textarea v-model="newMessage" label="Type a message" rows="3" auto-grow></v-textarea>
              <v-btn @click="sendMessage(orderDetails.id)" color="primary">Send</v-btn>
            </v-card-actions>
          </v-card>
        </div>

        <!-- Floating Button for Chat -->

          <v-btn
            v-if="orderDetails.items"
              fab
              color="primary"
              class="floating-btn"
              @click="toggleChatSection"
              style="position: fixed; bottom: 20px; right: 20px;"
            >
              <v-icon>mdi-chat</v-icon>
            </v-btn>
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
      FormattedDate
    },
  
    data: () => ({
      overlay: false,
      orders: [],
      orderDetails: {},
      orderStatus: "",
      storeId: 0,
      userId:2,
      showChatSection: false,
      newMessage: '',
      messages: [
      ], 

    }),
  
    async created() {
      var userDetails= await this.$store.getters["authentication/getUserDetails"];
      this.storeId = userDetails.storeId
      // console.log('this.storeId');
      // console.log(userDetails);
      // console.log(this.storeId);
      await this.fetchOrders();
    },
  
    computed: {

      // nextStatus
      nextStatus() {
          if (!this.orderDetails || !this.orderDetails.orderStatusHistory) return null;

          const statusFlow = ["Pending", "Accepted", "Preparing for Delivery", "Out for Delivery", "Completed"];

          // Find the latest status by the highest ID
          let latestStatusEntry = this.orderDetails.orderStatusHistory.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          }, { id: -1 }); // Initial value with an invalid ID

          let latestStatus = latestStatusEntry.status || this.orderDetails.orderStatus;

          // Find the next status in the sequence
          let currentIndex = statusFlow.indexOf(latestStatus);
          if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
            return null; // No further statuses
          }

          // Return the next status
          return statusFlow[currentIndex + 1];
        },
    },

  
    methods: {

      // currentStatus
      currentStatus(order) {
          if (!order || !order.orderStatusHistory) return null;

          // Find the latest status by the highest ID
          let latestStatusEntry = order.orderStatusHistory.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          }, order.orderStatusHistory[0] || null); // Use first entry if exists, otherwise null

          return latestStatusEntry ? latestStatusEntry.status : order.orderStatus;
        },

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

        const response = await apiService.getStoreOrderById(orderId);
        this.orderDetails = response.data;

        this.getMessage(orderId)
      } catch (error) {
        console.error('Error fetching store orders:', error);
      } finally {
        this.overlay = false;
      }
    },

     // addOrderStatusReq
    async addOrderStatusReq(orderId) {
            try {

              this.overlay = true;
       
              // Find the order by ID
              let order = this.orders.find(o => o.id === orderId);
              if (!order) return console.error("Order not found");

              let latestStatusEntry = order.orderStatusHistory.reduce((latest, current) => {
                    return current.id > latest.id ? current : latest;
                  }, { id: -1, status: order.orderStatus });
                  
                  let latestStatus = latestStatusEntry.status;

              const statusFlow = ["Pending", "Accepted", "Preparing for Delivery", "Out for Delivery", "Completed"];
              
              // Find the next status in the sequence
              let currentIndex = statusFlow.indexOf(latestStatus);
              if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
                console.warn("No further status updates possible.");
                return;
              }

              let nextStatus = statusFlow[currentIndex + 1];

              // Prepare data for API request
              var data = {
                orderId: orderId,
                status: nextStatus,
                updatedBy: this.userId,
              };

              // Send API request
              await apiService.addOrderStatus(data);

              // Update the local order status (Optimistic UI update)
              this.$set(order, "orderStatusHistory", [
                      ...order.orderStatusHistory,
                      {
                        id: latestStatusEntry.id + 1, // Simulate next ID (ensure unique ID)
                        orderId: orderId,
                        status: nextStatus,
                        updatedBy: this.userId,
                        updatedAt: new Date().toISOString(),
                      },
                    ]);

            // Force Vue to update UI
            this.$forceUpdate();

            } catch (error) {
              console.error("Error updating order status:", error);
            } finally {
              this.overlay = false;
            }
          },


       // toggleChatSection
      toggleChatSection() {
        this.showChatSection = !this.showChatSection;
      },

    // sendMessage
    async sendMessage(orderId) {
      
         var data = {
          "storeId": this.storeId,
          "orderId": orderId,
          "userId": this.userId,
          "message": this.newMessage,
          };

          // Send API request
          await apiService.addMessage(data);

          this.getMessage(orderId)
      
    },


    // getMessage
    async getMessage(orderId) {
        try {
          this.overlay = true;

            const response = await apiService.getMessage(orderId)
            this.messages = response.data;
          } catch (error) {
            console.error('Error get Message:', error);
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

.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000; /* Ensure it's above other content */
}

.chat-section {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 300px;
  z-index: 1000; /* Ensure it's above other content */
}

.chat-card {
  width: 100%;
}
</style>
