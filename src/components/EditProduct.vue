<template>
  <div>
    <v-dialog
      v-model="displayingUpdateDialog"
      persistent
      hide-overlay
      class="v-overlay"
      max-width="600px"
    >
      <v-card class="rounded-lg">
        <v-card-title>
          <span>Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="#ffde59" dark>
              <v-card-text>
                Updating Product ...
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
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
                  :error-messages="nameErrors"
                  @input="resetErrorValue"
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
                  maxlength="25"
                />
              </v-col>

              <v-col cols="12" class="pa-0">
                <label for="price">Price</label>
                <v-text-field
                  id="price"
                  v-model="form.price"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Price"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="size">Size</label>
                <v-text-field
                  id="size"
                  v-model="form.size"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="100 x 100"
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="type">Type</label>
                <v-text-field
                  id="type"
                  v-model="form.type"
                  class="mt-1 rounded-lg"
                  type="text"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Food, Electronics, Clothing..."
                />
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="image">Image</label>
                <v-file-input
                  v-model="form.image"
                  accept="image/*"
                  id="image"
                  class="mt-1 rounded-lg"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Choose Image"
                ></v-file-input>
              </v-col>
              <v-col cols="12" class="pa-0">
                <label for="stock_quantity">Stock Quantity</label>
                <v-text-field
                  id="stock_quantity"
                  v-model="form.stockQuantity"
                  class="mt-1 rounded-lg"
                  type="number"
                  color="#f9af23"
                  variant="outlined"
                  placeholder="Enter stock quantity"
                /> </v-col></v-row
          ></v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f9af23 darken-1" text @click="hideDialog">
            Close
          </v-btn>
          <v-btn color="#f9af23 darken-1" text @click="editProduct">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </div>
</template>
<script>
import Product from "../Api/Product";
import { mapState } from "vuex";
export default {
  name: "EditProduct",
  data() {
    return {
      loading: false,
      form: {
        name: null,
        description: null,
        price: null,
        size: null,
        type: null,
        image: [],
        stockQuantity: null,
      },
      nameErrors: "",
    };
  },
  props: {
    // product: {
    //   type: Object,
    //   required: true,
    // },
    productId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.form.name = this.product.name;
    this.form.description = this.product.description;
    this.form.price = this.product.price;
    this.form.size = this.product.size;
    this.form.type = this.product.type;
    this.form.image[0] = this.product.image;
    // this.form.image[0] = this.product.productImage;
    this.form.stockQuantity = this.product.stock_quantity;
    console.log(" this.form.image ", this.form.image);
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      user: (state) => state.user,
      displayingUpdateDialog: (state) => state.displayingUpdateDialog,
      product: (state) => state.product,
    }),
  },
  methods: {
    async editProduct() {
      this.loading = true;
      let user = JSON.parse(localStorage.getItem("user"));
      // const params = {
      //   id: this.productId,
      //   name: this.form.name,
      //   description: this.form.description,
      //   price: this.form.price,
      //   size: this.form.size,
      //   type: this.form.type,
      //   image: this.form.image,
      //   stockQuantity: this.form.stockQuantity,
      //   userId: user.id,
      // };
      let fomrData = new FormData();
      fomrData.append("id", this.productId);
      fomrData.append("name", this.form.name);
      fomrData.append("description", this.form.description);
      fomrData.append("price", this.form.price);
      fomrData.append("size", this.form.size);
      fomrData.append("type", this.form.type);
      fomrData.append("image", this.form.image);
      fomrData.append("stockQuantity", this.form.stockQuantity);
      fomrData.append("userId", user.id);

      Product.editProduct(fomrData)
        .then((response) => {
          if (response != null) {
            this.loading = false;
            this.$store.dispatch("getProducts");
            this.$store.dispatch("setDisplayingUpdateDialog", false);
            this.$store.dispatch("setSnackBar", {
              color: "#fff3e0 lighten-1",
              text: "Product was added successfully!",
              show: true,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          let errors = err.response.data.errors;
          if (errors) {
            if (errors.name) {
              this.nameErrors = errors.name;
            }
          }
        });
    },
    resetErrorValue() {
      if (this.nameErrors != "") {
        this.nameErrors = "";
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    hideDialog() {
      this.form.name = this.product.name;
      this.form.description = this.product.description;
      this.form.price = this.product.price;
      this.form.size = this.product.size;
      this.form.type = this.product.type;
      this.form.image = this.product.image;
      this.form.stockQuantity = this.product.stock_quantity;
      this.$store.dispatch("setDisplayingUpdateDialog", false);
    },
  },
};
</script>
