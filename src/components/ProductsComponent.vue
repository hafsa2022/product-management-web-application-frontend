<template>
  <div class="pb-4">
    <v-card
      elevation="0"
      class="mx-2 mb-4 mt-8"
      style="background-color: #fff3e0"
    >
      <v-row justify="center">
        <v-col cols="6">
          <v-card elevation="0" style="background-color: #fff3e0">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search by name"
                single-line
                hide-details
                variant="outlined"
                color="#f9af23"
                @input="filteredCards"
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-col cols="2">
          <v-card elevation="0" style="background-color: #fff3e0">
            <v-card-title>
              <v-text-field
                type="number"
                v-model="cardsPerPage"
                label="item per page"
                single-line
                hide-details
                variant="outlined"
                color="white"
              ></v-text-field>
            </v-card-title>
          </v-card>
        </v-col> </v-row
      ><v-container>
        <v-row justify="center">
          <ProductCard
            v-for="product in paginatedCards"
            :key="product.id"
            :product="product"
        /></v-row>

        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(products.length / cardsPerPage)"
          class="mt-4"
        ></v-pagination>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import { mapState } from "vuex";
export default {
  name: "ProductsComponent",
  data() {
    return {
      search: "",
      currentPage: 1,
      cardsPerPage: 2, // Number of cards per page
      searchedCards: [],
      // products: [],
    };
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  components: {
    ProductCard,
  },
  computed: {
    ...mapState({
      products: (state) => state.products,
    }),
    getProducts() {
      return this.$store.getters.getAllProducts;
    },
    paginatedCards() {
      const searchedCards = this.filteredCards();
      const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      const endIndex = startIndex + this.cardsPerPage;
      return searchedCards.slice(startIndex, endIndex);
    },
  },
  methods: {
    filteredCards() {
      this.searchedCards = this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search.toLowerCase());
      });
      return this.searchedCards;
    },
  },
};
</script>

<style></style>
