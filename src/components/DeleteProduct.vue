<template>
  <div>
    <v-dialog
      v-model="displayingDeleteDialog"
      persistent
      hide-overlay
      class="v-overlay"
      max-width="600px"
    >
      <v-card class="rounded-lg">
        <v-card-title
          >Are you sure you want to delete this product ?
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f9af23 darken-1" text @click="hideDialog"
            >Cancel</v-btn
          >
          <v-btn color="#f9af23 darken-1" text @click="deleteProduct"
            >Yes</v-btn
          >
          <v-spacer></v-spacer>
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
  name: "DeleteProduct",
  data() {
    return { loading: false };
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      displayingDeleteDialog: (state) => state.displayingDeleteDialog,
    }),
  },
  methods: {
    async deleteProduct() {
      this.loading = true;
      let id = this.productId;
      Product.deleteProduct(id)
        .then((response) => {
          if (response != null) {
            this.loading = false;
            this.$store.dispatch("getProducts");
            this.$store.dispatch("setDisplayingDeleteDialog", false);
            this.$store.dispatch("setSnackBar", {
              color: "#fff3e0 lighten-1",
              text: "Product was deleted successfully!",
              show: true,
            });
          }
        })
        .catch(() => {
          this.loading = false;
          this.$store.dispatch("setDisplayingDeleteDialog", false);
        });
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    hideDialog() {
      this.$store.dispatch("setDisplayingDeleteDialog", false);
    },
  },
};
</script>
