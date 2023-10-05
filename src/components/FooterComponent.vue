<template>
  <div class="">
    <v-footer dark padless>
      <v-card
        width="100%"
        class="text-white text-center"
        style="background-color: #f9af23"
      >
        <v-card-text class="">
          <h1 class="py-2 text-white">You Can Find Us At</h1>
          <a
            target="_blank"
            v-bind:href="social.url"
            v-for="social in socials"
            :key="social.id"
          >
            <v-btn class="ma-4" icon style="background-color: #fff3e0">
              <v-icon size="24px" style="color: #f9af23">{{
                social.icon
              }}</v-icon>
            </v-btn>
          </a>
        </v-card-text>

        <v-card-text class="text-white">
          Copyright @ {{ new Date().getFullYear() }}
          <span class="text-white">by Hafsa El Akhdar </span>
          | all rights reserverd!
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  data: () => ({
    panel: [],
    socials: [
      {
        name: "facebook",
        icon: "mdi-facebook",
        url: "#",
      },
      {
        name: "twitter",
        icon: "mdi-twitter",
        url: "#",
      },
      { name: "google", icon: "mdi-google", url: "#" },
      {
        name: "linkedin",
        icon: "mdi-linkedin",
        url: "#",
      },
      {
        name: "instagram",
        icon: "mdi-instagram",
        url: "#",
      },
    ],
  }),

  methods: {},
};
</script>

<style>
.v-footer {
  padding: 0px 0px;
  border-radius: 0px;
}
</style>
