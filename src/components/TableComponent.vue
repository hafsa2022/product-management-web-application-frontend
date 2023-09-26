<template>
  <div class="pb-4">
    <v-card elevation="0" class="mx-2 mb-4 mt-8">
      <v-row>
        <v-col cols="12">
          <v-card elevation="0">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search by name"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="getProducts"
              :search="search"
              :loading="loadTable"
              :items-per-page="15"
              class="elevation-1"
              loading-text="Loading list of alerts... Please wait"
              no-data-text="No alerts found, try creating one .."
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td :style="`font-size: 14px`">
                    {{ item.image }}
                  </td>
                  <td :style="`font-size: 14px`">{{ item.description }}</td>
                  <td :style="`font-size: 14px`">
                    {{ item.type }}
                  </td>
                  <td class="custom-cell" :style="`font-size: 14px`">
                    {{ item.price }}
                  </td>
                </tr>
              </template></v-data-table
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  data() {
    return {
      search: "",
      loadTable: false,
      headers: [],
    };
  },
  computed: {
    getProducts() {
      return [];
    },
  },
};
</script>

<style></style>
