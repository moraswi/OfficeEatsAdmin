<template>
    <div class="px-md-4">
      <TheHeader ></TheHeader>

      <v-layout class="mt-5">
        <!-- Today -->
        <v-card class="px-5 py-3" width="250">
          <h2>Today</h2>
          <label>12/02/2000</label>
          <h3>150</h3>
        </v-card>

        <!-- Yesterday -->
        <v-card class="pa-3 ml-3" width="250">
          <h2>Yesterday</h2>
          <label>11/02/2000</label>
          <h3>150</h3>
        </v-card>

        <!-- Yesterday -->
        <v-card class="pa-3 ml-3" width="250">
          <h2>Last 7 Days</h2>
          <label>12/02/2000 to 12/02/2000</label>
          <h3>150</h3>
        </v-card>

          <!-- Yesterday -->
          <v-card class="pa-3 ml-3" width="250">
          <h2>Last 30 Days</h2>
          <label>12/02/2000 to 12/02/2000</label>
          <h3>150</h3>
        </v-card>
      </v-layout>

   

      <v-row class="mt-5">
        <v-col cols="12" md="9">
          <v-card height="500" class="d-flex flex-column pa-1 scrollable-card" style="overflow-y: auto;" flat >

            <v-card height="87" class=" pa-1" width="350" flat>

            <div class="d-flex">
                      <v-text-field
                          v-model="orderCode"
                          class=""
                          outlined
                          label="Order Code"
                          variant="outlined"
                          width="150"
                        ></v-text-field>

                        <v-btn class="ml-3 red white--text">
                          Search
                        </v-btn>
                      </div>

            </v-card>
                    <v-card height="87" class=" pa-1" width="350">
                        <h2>1C45</h2>
                        <h4>R 40.00</h4>
                        <p class="orange--text">Pending</p>
                    </v-card>
                    
            </v-card>
        </v-col>

        <v-col col="12" md="3">
          <v-card height="500" class="pa-2 d-flex flex-column scrollable-card" style="overflow: auto;">

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
    name: "AdminOrdersPage",
  
    components: {
      TheHeader,
    },
  
    data: () => ({
      overlay: false,
      tab: null,
      dragging: false,
      files: [],
      items: ['Drink', 'Box Meal', 'Starters'],
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
        // handle drop
    handleDrop(event) {
      const files = event.dataTransfer.files;
      this.handleFiles({ target: { files } });
      this.dragging = false;
    },

    // remove file
    removeFile(index) {
      this.files.splice(index, 1);
    },

    // handle files
    handleFiles(event) {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        const file = files[0];
        this.files = [{ file: file }];
      }
      event.target.value = ""; // clear the input
    },

    // upload document
    async uploadMicroblinkCSVReq() {
      if (!this.files.length) {
        this.$swal.fire({
          icon: "error",
          title: "Please select a file to upload",
          showConfirmButton: true,
        });
        return;
      }

      try {
        this.overlay = true;

        const formData = new FormData();
        formData.append("csvupload", this.files[0].file);

        // Hardcoding the GUID for now
        // const hardcodedId = "6o9164c0-9fbb-42e2-af3a-485136d99785";
        const randomId = crypto.randomUUID();
        formData.append("id", randomId);
        console.log(randomId);
        const response = await this.$store.dispatch(
          "jobs/uploadMicroblinkCSVReq",
          formData
        );

        if (response.status === 200) {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Successfully Uploaded Document!",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "error",
            title: "Something went wrong!",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.log(error);
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Error occurred while uploading!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } finally {
        this.overlay = false;
      }
    },
    },
  };
  </script>
  
<style lang="scss" scoped>
.scrollable-card {
  overflow-y: auto;
  scrollbar-width: none; /* For Firefox */
}

.scrollable-card::-webkit-scrollbar {
  display: none; /* For Chrome, Safari, and Edge */
}

</style>
