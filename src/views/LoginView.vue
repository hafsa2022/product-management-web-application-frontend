<template>
  <v-container
    class="d-flex justify-center align-center pa-4 mb-10"
    style="padding-bottom: 20px; height: 900px"
  >
    <v-card
      class="elevation-0 rounded-lg"
      flat
      width="600"
      height="auto"
      style="background-color: #fff3e0"
    >
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="#ffde59" dark>
          <v-card-text>
            Login ...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-container>
        <v-card-title class="">
          <v-img
            src="../assets/logo.png"
            controls
            width="400"
            height="200"
            contain
            class="mx-auto"
        /></v-card-title>
        <v-row>
          <v-col cols="12" class="pa-0">
            <label for="email">Email address</label>
            <v-text-field
              id="email"
              v-model="form.email"
              class="mt-1 rounded-lg"
              type="email"
              :error-messages="emailErrors"
              color="#f9af23"
              variant="outlined"
              placeholder="Email address"
              autofocus
              @input="resetErrorValue"
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="password">Password</label>
            <v-text-field
              id="password"
              v-model="form.password"
              class="mt-1 rounded-lg"
              placeholder="Enter password"
              :error-messages="passwordErrors"
              color="#f9af23"
              variant="outlined"
              type="password"
              @input="resetErrorValue"
            />
          </v-col>

          <v-col cols="12" class="pa-0">
            <v-btn
              type="submit"
              block
              class="mt-2 mb-3"
              text="Login"
              size="large"
              color="#f9af23"
              @click="login"
            ></v-btn>
          </v-col>
          <v-col cols="12" class="pa-0">
            <span class="text-h6">Don't have an account ?</span>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-btn
              type="submit"
              block
              class="mt-2"
              text="Register Now"
              to="/singin"
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
import User from "../Api/User";
import { mapState, mapActions } from "vuex";
export default {
  name: "LoginView",
  data() {
    return {
      loading: false,
      form: {
        email: null,
        password: "",
      },
      emailErrors: "",
      passwordErrors: "",
      emailRules: [
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      ],
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  methods: {
    ...mapActions(["SetUserInfo"]),
    async login() {
      this.loading = true;
      const params = {
        email: this.form.email,
        password: this.form.password,
      };
      User.login(params)
        .then((response) => {
          if (response != null) {
            this.loading = false;
            this.$store.dispatch("setSnackBar", {
              color: "#ffde59 lighten-1",
              text: "Welcome to our website!",
              show: true,
            });
            this.$router.replace(this.$route.query.redirect || "/");
            this.SetUserInfo(response);
          }
        })
        .catch((err) => {
          this.loading = false;
          let errors = err.response.data.errors;
          if (errors) {
            if (errors.email) {
              this.emailErrors = errors.email;
            } else if (errors.password) {
              this.passwordErrors = errors.password;
            }
          }
        });
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    resetErrorValue() {
      if (this.emailErrors != "") {
        this.emailErrors = "";
      } else if (this.passwordErrors != "") {
        this.passwordErrors = "";
      }
    },
  },
};
</script>

<style></style>
