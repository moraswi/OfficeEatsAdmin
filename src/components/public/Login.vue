<template>
    <v-container fluid >
      <v-row  class=" mt-md-16 mt-2">
        <v-col align="center"  cols="12">
          <!-- <img src="@/assets/face.png" alt="face" contain width="200" > -->
        </v-col>
        <v-col align="center" cols="12">

          <v-card width="900"  flat>
      <h2 class="text-center mt-md-5">LOGIN</h2>

          <v-text-field
            v-model="email"
            class="mt-md-10 mt-3"
            outlined
            label="Email"
            variant="outlined"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            class="mt-md-2"
            outlined
            label="Password"
            variant="outlined"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
      <v-btn width="100%" class="py-6 white--text" color="red" @click="logIn">Login</v-btn>
    </v-card>
        </v-col>
      </v-row>

       <!-- Overlay -->
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    </v-container>
  </template>
  
  <script>
import router from "@/router";

    export default {
    name: 'LogIn',

      data () {
        return {
          email:"",
          password:"",
          showPassword: false,
          overlay: false,
        }
      },

      methods: {
        // logIn
        async logIn() {
            router.push({ name: "MenuAndCategories" });
        },

        async logInOld() {
          try {
        this.overlay = true;

            const data = {
              email: this.email,
              password: this.password,
            }
            
            if(this.email == "admin@alliance.com" && this.password == "Alliance@123" ){
                  const response = await this.$store.dispatch('dataModules/logIn',data);
                if(response.status == 200){

                    // if(data.email == "admin@alliance.com" && data.password == "Alliance@123"){
                        router.push({ name: "Feedback" });
                                  this.$swal({
                          toast: true,
                          position: "top-end",
                          icon: "success",
                          title: "Successfully logged in!",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                        });
                    // }
              this.overlay = false;
          
                        }
                      }else{
                            this.$swal({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: "Wrong Credentials!",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                          });
                      }

              this.overlay = false;
                        
          } catch (error) {
            this.overlay = false;
            console.log("logIn: ",error)
          }
        }
      },
    }
  </script>

  