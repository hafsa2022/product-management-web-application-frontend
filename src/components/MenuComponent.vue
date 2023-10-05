<template>
  <div class="text-center">
    <v-menu offset-x>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="brown" size="40">
            <v-img
              src="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list class="avmenu" style="background: #f9af23">
        <v-btn
          depressed
          text
          width="100%"
          @click="logout"
          style="background: #f9af23"
          elevation="0"
        >
          Logout
        </v-btn>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
  methods: {
    async logout() {
      this.$store.dispatch("setLogOut");
      this.$router.replace(this.$route.query.redirect || "/login");
    },
  },
};
</script>

<style>
.avmenu {
  width: 205px !important;
  padding: 5px 0 !important;
}
</style>
