<template>
  <v-app-bar
    style="background-color: #fff"
    class="px-auto"
    app
    flat
    height="100"
  >
    <v-toolbar-title class=""
      ><span style="">
        <v-img src="../assets/logo.png" controls width="300" height="100" />
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-row justify="end" class="my-2 mx-6 flex align-center" v-if="auth">
      <MenuComponent v-if="user" />
      <!-- <AvatarMenu v-if="user" :user-data="user" /> -->
      <div v-if="user" class="mx-2 mt-4">
        <h5 class="bold" style="font-size: 14px; color: #192a3e">
          {{ user.name }}
        </h5>
        <p style="font-size: 12px; color: #90a0b7">{{ user.email }}</p>
      </div>
    </v-row>
  </v-app-bar>
  <NavDrawer />
</template>

<script>
import MenuComponent from "../components/MenuComponent.vue";
import NavDrawer from "../components/NavDrawer.vue";
import { mapState } from "vuex";
export default {
  name: "NavBar",
  data: () => ({}),
  components: {
    NavDrawer,
    MenuComponent,
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style></style>
