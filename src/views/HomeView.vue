<template>
  <div>
    <v-row justify="end">
      <v-col lg="1" md="1" sm="2" xsm="4" class="pa-4 mr-5">
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
    <v-row justify="center" class="mb-8 px-6">
      <v-col lg="3" md="3" sm="4"
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
