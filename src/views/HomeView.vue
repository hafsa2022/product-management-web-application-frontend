<template>
  <div>
    <v-row justify="end">
      <v-col cols="1" class="pa-4">
        <v-btn
          type="submit"
          block
          class="mt-2 mb-3"
          text="Login Now"
          size="large"
          color="#f9af23"
          to="/login"
          v-if="!auth"
        ></v-btn> </v-col
    ></v-row>
    <AddProduct />
    <ProductsComponent />
    <v-row justify="center" class="mb-8">
      <v-col cols="3"
        ><v-btn v-if="auth" block color="#f9af23" @click="addProduct"
          >Add New Product</v-btn
        ></v-col
      >
    </v-row>
  </div>
</template>

<script>
import ProductsComponent from "../components/ProductsComponent.vue";
import AddProduct from "../components/AddProduct.vue";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: { ProductsComponent, AddProduct },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    addProduct() {
      this.$store.dispatch("setDisplayingDialog", true);
    },
  },
};
</script>
