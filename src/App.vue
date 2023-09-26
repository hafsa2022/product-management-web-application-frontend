<template>
  <v-app>
    <NavBar v-if="isLogged" />
    <v-main style="background-color: #fff3e0" class="">
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import NavBar from "./components/NavBar.vue";
import FooterComponent from "./components/FooterComponent.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    NavBar,
    FooterComponent,
  },
  computed: {
    ...mapState({
      isLogged: (state) => state.isLogged,
    }),
  },
};
</script>
