<template>
  <div>
    <v-dialog
      v-model="displayingViewDialog"
      persistent
      hide-overlay
      class="v-overlay"
      max-width="600px"
    >
      <v-card class="rounded-lg">
        <img src="" width="424" height="300" class="img-decoration mx-auto" />
        <v-card-title class="text-wrap">{{ product.name }}</v-card-title>
        <v-card-text class="text-gray"
          ><p><span class="">Desciption : </span>{{ product.description }}</p>
          <p><span>Price : </span>{{ product.price }}</p>
          <p><span>Size : </span>{{ product.size }}</p>
          <p><span>Type : </span>{{ product.type }}</p>
          <p>
            <span>Stock Quantity : </span>{{ product.stock_quantity }}
          </p></v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#f9af23 darken-1" text @click="hideDialog"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ViewProduct",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("productId", this.product.id);
  },
  computed: {
    ...mapState({
      displayingViewDialog: (state) => state.displayingViewDialog,
    }),
  },
  methods: {
    hideDialog() {
      this.$store.dispatch("setDisplayingViewDialog", false);
    },
  },
};
</script>
