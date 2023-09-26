<template>
  <v-container class="d-flex justify-center align-center pa-4 pt-12 mb-10">
    <v-card
      class="elevation-0 rounded-lg"
      flat
      width="600"
      height="auto"
      style="background-color: #fff3e0"
    >
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0">
            <label for="name">Name</label>
            <v-text-field
              id="name"
              v-model="form.name"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Choose name"
              autofocus
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="description">Description</label>
            <v-text-field
              id="description"
              v-model="form.description"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Description"
              autofocus
            />
          </v-col>

          <v-col cols="12" class="pa-0">
            <label for="prie">Price</label>
            <v-text-field
              id="price"
              v-model="form.price"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Price"
              autofocus
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="email">Size</label>
            <v-text-field
              id="size"
              v-model="form.size"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="100 x 100"
              autofocus
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="email">Type</label>
            <v-text-field
              id="type"
              v-model="form.type"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Food, Electronics, Clothing..."
              autofocus
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="image">Image</label>
            <v-file-input
              v-model="form.image"
              label="Change Profile Picture"
              accept="image/*"
              id="image"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Choose Image"
              autofocus
            ></v-file-input>
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="Stock_quantity">Stock Quantity</label>
            <v-text-field
              id="Stock_quantity"
              v-model="form.stockQuantity"
              class="mt-1 rounded-lg"
              type="text"
              color="#f9af23"
              variant="outlined"
              placeholder="Enter stock quantity"
              autofocus
            />
          </v-col>

          <v-col cols="12" class="pa-0">
            <v-btn
              type="submit"
              block
              class="mt-2 mb-3"
              text="Add Product"
              size="large"
              color="#f9af23"
            ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
  <div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          class=""
          v-bind="attrs"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Product from "../Api/Product";
import { mapState } from "vuex";
export default {
  name: "AddProductView",
  data() {
    return {
      loading: false,
      form: {
        name: null,
        description: null,
        price: null,
        size: null,
        type: null,
        image: null,
        stockQuantity: null,
      },
      // emailErrors: "",
      // passwordErrors: "",
      // emailRules: [
      //   (value) => {
      //     const pattern =
      //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //     return pattern.test(value) || "Invalid e-mail.";
      //   },
      // ],
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  methods: {
    async addProduct() {
      this.loading = true;
      const params = {
        email: this.form.email,
        password: this.form.password,
      };
      Product.addProduct(params)
        .then((response) => {
          if (response != null) {
            this.loading = false;
            this.$store.dispatch("setSnackBar", {
              color: "#fff3e0 lighten-1",
              text: "Product was added successfully!",
              show: true,
            });
            this.SetUserInfo(response);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
  },
};
</script>

<style></style>
