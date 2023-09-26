<template>
  <div class="text-center mr-10">
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
      <v-list class="avmenu">
        <v-btn depressed text width="100%" to="/"> Logout </v-btn>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
.avmenu {
  width: 205px !important;
  padding: 5px 0 !important;
}
</style>
