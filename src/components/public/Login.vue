<template>
    <div class="px-md-4">
      <TheHeader title="Announcements"></TheHeader>
      <h1>Login here</h1>
  
      <v-overlay :value="overlay" z-index="1000">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </template>
  
  <script>
  import TheHeader from "@/components/shared/TheHeader.vue";
  
  export default {
    name: "LoginPage",
  
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
  