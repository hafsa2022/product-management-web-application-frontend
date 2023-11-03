<template>
  <v-app>
    <NavBar />
    <v-main style="background-color: #fff3e0" class="">
      <router-view />
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="#ffde59" dark>
          <v-card-text>
            Disconnecting ...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script>
// import { mapActions } from "vuex";
import NavBar from "./components/NavBar.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",

  data: () => ({
    user: null,
  }),
  components: {
    NavBar,
    FooterComponent,
  },
  computed: {
    // auth() {
    //   return this.$store.getters.isAuthenticated;
    // },
    loading() {
      return this.$store.getters.getLoadingLogOut;
    },
  },
  mounted() {
    this.$store.dispatch("setUser", JSON.parse(localStorage.getItem("user")));

    this.$store.dispatch("updateToken", localStorage.getItem("token"));
  },
};
</script>
