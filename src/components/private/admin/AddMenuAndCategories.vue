<template>
    <div class="px-md-4">
      <TheHeader ></TheHeader>

      
    <v-tabs
      v-model="tab"
      bg-color="primary"
      class="mt-5"
    >
      <v-tab v-model="one">Categories</v-tab>
      <v-tab v-model="two">Menu Items</v-tab>
      <v-tab v-model="three">Menu Images</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item v-model="one">
            <v-text-field
            v-model="categoryName"
            class="mt-md-10 mt-3"
            outlined
            label="Category Name"
            variant="outlined"
          ></v-text-field>
          <v-btn width="100%" class="py-6 white--text" color="red" @click="">Submit</v-btn>
  
        </v-tab-item>

        <!-- menuItemName -->
        <v-tab-item v-model="two">

            <v-row>
                <v-col cols="12" md="6">
       
        <!-- Categories -->
            <v-select
            :items="items"
            label="Categories"
            outlined
            ></v-select>

        <!-- menuItemName -->
            <v-text-field
            v-model="menuItemName"
            class=""
            outlined
            label="Menu Name"
            variant="outlined"
          ></v-text-field>

          <!-- menuDescription -->
          <v-text-field
            v-model="menuDescription"
            class=" "
            outlined
            label="Short Description"
            placeholder = "e.g chips, bugger and coke"
            variant="outlined"
          ></v-text-field>

          <!-- menuPrice -->
          <v-text-field
            v-model="menuPrice"
            class=" "
            outlined
            label="Price(R)"
            placeholder="e.g 110.56"
            variant="outlined"
          ></v-text-field>
          <!-- Submit -->
          <v-btn width="100%" class="py-6 white--text" color="red" @click="">Submit Menu</v-btn>
        </v-col>

        <v-col cols="12" md="6">
        
            <section
                class="mt-2 main-container"
                @dragover.prevent
                @drop.prevent="handleDrop"
            >
                <div fluid align="center" justify="center">
                <div
                    :class="['dropZone', dragging ? 'dropZone-over' : '']"
                    @dragenter="dragging = true"
                    @dragleave="dragging = false"
                >
                    <div class="dropZone-info">
                    <span class="fa fa-cloud-upload dropZone-title"></span>

                    <v-row class="secondary--text" justify="center">
                        <div class="d-flex flex-column py-6 dropZone-title">
                        <span class="titleUpload secondary--text">
                            <v-icon class="ml-md-n16 mr-3" color="secondary" size="38"
                            >mdi-cloud-upload</v-icon
                            >
                            Drop CSV File Here
                        </span>

                        <input
                            class="secondary--text"
                            type="file"
                            @change="handleFiles"
                        />
                        </div>
                    </v-row>
                    </div>
                </div>
                </div>
            </section>

           <!-- uploaded file name -->
           <ul class="mt-5">
                <li v-for="(file, index) in files" :key="index">
                {{ file.file.name }}
                <v-icon color="red" @click="removeFile(index)"
                    >mdi-window-close</v-icon
                >
                </li>
            </ul>

      <!-- <v-btn width="100%" class="py-6 white--text" color="red" @click="">Submit Image</v-btn> -->

        </v-col>
    </v-row>
        </v-tab-item>

        <v-tab-item v-model="three">
          Three
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  
  
      <v-overlay :value="overlay" z-index="1000">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </template>
  
  <script>
  import TheHeader from "@/components/shared/TheHeader.vue";
  
  export default {
    name: "AddMenuAnCategoriesPage",
  
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

.titleUpload {
  font-weight: 800;
  font-size: 20px;
  line-height: 29px;
}

.dropZone {
  width: 100%;
  height: 135px;
  position: relative;
  border: 2px dashed black;
  border-radius: 16px;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

@media screen and (max-width: 320px) {
  .titleUpload {
    font-size: 15px;
  }
}

</style>
