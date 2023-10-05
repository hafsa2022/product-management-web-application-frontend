<template>
  <v-col lg="3" md="8" sm="8" xs="8" class="">
    <div class="text-center" style="margin: auto">
      <v-card class="rounded-lg" elevation="3" width="100%" height="500">
        <img
          :src="`http://localhost:8000/storage/images/products/${product.image}`"
          width="424"
          height="250"
          class="img-decoration mt-2"
        />
        <v-card-title class="text-wrap">{{ product.name }}</v-card-title>
        <v-card-text class="text-gray">{{ product.description }}</v-card-text>
        <v-card-actions class="mx-auto" height="50">
          <v-row class="" justify="center"
            ><v-col cols="3">
              <v-dialog
                persistent
                hide-overlay
                class="v-overlay"
                max-width="600px"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    class="mt-2"
                    to="/"
                    size="small"
                    color="#f9af23"
                    ><v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card class="rounded-lg">
                    <img
                      :src="`http://localhost:8000/storage/images/products/${product.image}`"
                      width="424"
                      height="300"
                      class="img-decoration mx-auto mt-2 mb-2"
                    />
                    <v-card-title class="text-wrap">{{
                      product.name
                    }}</v-card-title>
                    <v-card-text class="text-gray"
                      ><p>
                        <span class="">Desciption : </span
                        >{{ product.description }}
                      </p>
                      <p><span>Price : </span>{{ product.price }} dh</p>
                      <p><span>Size : </span>{{ product.size }}</p>
                      <p><span>Type : </span>{{ product.type }}</p>
                      <p>
                        <span>Stock Quantity : </span
                        >{{ product.stock_quantity }}
                      </p></v-card-text
                    >

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        text="Close"
                        @click="isActive.value = false"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-col>
            <v-col cols="3" v-if="auth && user.id === product.user_id">
              <v-dialog
                persistent
                hide-overlay
                class="v-overlay"
                max-width="600px"
                v-model="displayingUpdateDialog"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    class="mt-2"
                    to="/"
                    size="small"
                    color="#f9af23"
                    ><v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card class="rounded-lg">
                  <v-card-title>
                    <span>Edit Product</span>
                  </v-card-title>
                  <v-card-text>
                    <v-dialog
                      v-model="loading"
                      hide-overlay
                      persistent
                      width="300"
                    >
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
                    <v-btn
                      color="#f9af23 darken-1"
                      @click="displayingUpdateDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                      color="#f9af23 darken-1"
                      style="background: #f9af23"
                      @click="editProduct"
                    >
                      Update
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="3" v-if="auth && user.id === product.user_id">
              <v-dialog
                persistent
                hide-overlay
                class="v-overlay"
                max-width="600px"
                v-model="displayingDeleteDialog"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    class="mt-2"
                    to="/"
                    size="small"
                    color="#f9af23"
                    ><v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card class="rounded-lg">
                  <v-card-title
                    >Are you sure you want to delete this product ?
                  </v-card-title>
                  <v-card-text>
                    <v-dialog
                      v-model="deleteLoading"
                      hide-overlay
                      persistent
                      width="300"
                    >
                      <v-card color="#ffde59" dark>
                        <v-card-text>
                          Deleting Product ...
                          <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                          ></v-progress-linear>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#f9af23 darken-1"
                      text
                      @click="displayingDeleteDialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn color="#f9af23 darken-1" @click="deleteProduct"
                      >Yes</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog> </v-col
          ></v-row>
        </v-card-actions>
      </v-card>
    </div>
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
    </div></v-col
  >
</template>

<script>
import Product from "../Api/Product";
import { mapState } from "vuex";
export default {
  name: "ProductCard",
  data() {
    return {
      displayingUpdateDialog: false,
      displayingDeleteDialog: false,
      loading: false,
      deleteLoading: false,
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
  mounted() {
    this.form.name = this.product.name;
    this.form.description = this.product.description;
    this.form.price = this.product.price;
    this.form.size = this.product.size;
    this.form.type = this.product.type;
    this.form.image[0] = this.product.image;
    this.form.stockQuantity = this.product.stock_quantity;
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      user: (state) => state.user,
    }),
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  components: {},
  methods: {
    async editProduct() {
      this.loading = true;
      let user = JSON.parse(localStorage.getItem("user"));
      let fomrData = new FormData();
      fomrData.append("id", this.product.id);
      fomrData.append("name", this.form.name);
      fomrData.append("description", this.form.description);
      fomrData.append("price", this.form.price);
      fomrData.append("size", this.form.size);
      fomrData.append("type", this.form.type);
      fomrData.append("image", this.form.image[0]);
      fomrData.append("stockQuantity", this.form.stockQuantity);
      fomrData.append("userId", user.id);
      console.log("fomrData", fomrData.get("image"));

      Product.editProduct(fomrData)
        .then((response) => {
          if (response != null) {
            this.loading = false;
            this.$store.dispatch("getProducts");
            this.displayingUpdateDialog = false;
            this.$store.dispatch("setSnackBar", {
              color: "#fff3e0 lighten-1",
              text: "Product was added successfully!",
              show: true,
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          this.displayingUpdateDialog = false;
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
    async deleteProduct() {
      this.deleteLoading = true;
      let id = this.product.id;
      Product.deleteProduct(id)
        .then((response) => {
          if (response != null) {
            this.deleteLoading = false;
            this.$store.dispatch("getProducts");
            this.displayingDeleteDialog = false;
            this.$store.dispatch("setSnackBar", {
              color: "#fff3e0 lighten-1",
              text: "Product was deleted successfully!",
              show: true,
            });
          }
        })
        .catch(() => {
          this.deleteLoading = false;
          this.displayingDeleteDialog = false;
        });
    },
  },
};
</script>

<style>
.img-decoration {
  transition: transform 1s ease-in-out;
}
.img-decoration:hover {
  transform: scale(1.1);
}
</style>
