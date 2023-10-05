<template>
  <v-container
    class="d-flex justify-center align-center pa-4"
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
            Create Account ...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-container>
        <v-card-title>
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
            <label for="username">Username</label>
            <v-text-field
              id="username"
              v-model="form.userName"
              class="mt-1 rounded-lg"
              type="text"
              :error-messages="userNameErrors"
              color="#f9af23"
              variant="outlined"
              placeholder="Username"
              autofocus
              :rules="[rules.userName]"
              required
              @input="resetErrorValue"
          /></v-col>
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
              required
              :rules="[rules.email]"
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
              required
              @input="resetErrorValue"
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <label for="passwordconfirmation">Password Confirmation</label>
            <v-text-field
              id="passwordconfirmation"
              v-model="form.passwordConfirmation"
              class="mt-1 rounded-lg"
              placeholder="Password confirmation"
              :error-messages="passworConfirmationdErrors"
              color="#f9af23"
              variant="outlined"
              type="password"
              required
              @input="resetErrorValue"
              :rules="[rules.passwordConfirmation]"
            />
          </v-col>

          <v-col cols="12" class="pa-0">
            <v-btn
              type="submit"
              block
              class="mt-2 mb-3"
              text="Register"
              size="large"
              color="#f9af23"
              @click="signUp"
            ></v-btn>
          </v-col>
          <v-col cols="12" class="pa-0">
            <span class="text-h6">Already have an account ?</span>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-btn
              type="submit"
              block
              class="mt-2"
              text="Login Now"
              to="login"
              size="large"
              color="#f9af23"
            ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action:actions>
          <v-btn color="white" text class="" @click="closeSnackbar">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import User from "../Api/User";
import { mapState } from "vuex";
export default {
  name: "SignUpView",
  data() {
    return {
      loading: false,
      form: {
        userName: null,
        email: null,
        password: null,
        passwordConfirmation: null,
      },
      userNameErrors: "",
      emailErrors: "",
      passwordErrors: "",
      passwordConfirmationErrors: "",
      rules: {
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        userName: (value) => {
          if (value?.length < 6)
            return "First name must be more than 6 characters.";

          return true;
        },
        passwordConfirmation: (value) => {
          if (value === this.form.password) return true;
          return " Password and password confirmation should be the same";
        },
        paassword: (value) => {
          if (value > 6) return true;
          return " Password should have more than 6 caracteres";
        },
      },
    };
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
    }),
  },
  methods: {
    async signUp() {
      if (this.form.password === this.form.passwordConfirmation) {
        this.loading = true;
        const params = {
          name: this.form.userName,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.passwordConfirmation,
        };
        User.signUp(params)
          .then((response) => {
            if (response != null) {
              this.loading = false;
              this.$store.dispatch("setSnackBar", {
                color: "#ffde59",
                text: "Account was created successfully , you can login now!",
                show: true,
              });
            }
          })
          .catch((err) => {
            this.loading = false;
            let errors = err.response.data.errors;
            if (errors) {
              if (errors.email) {
                this.emailErrors = errors.email;
              } else if (errors.name) {
                this.userNameErrors = errors.name;
              } else if (errors.password) {
                this.passwordErrors = errors.password;
              } else if (errors.password_confirmation) {
                this.passwordConfirmationErrors = errors.password_confirmation;
              }
            }
          });
      } else {
        this.passwordConfirmationErrors =
          " Password and confirm password should be the same";
      }
    },
    closeSnackbar() {
      this.$store.dispatch("setSnackBar", {
        color: "",
        text: "",
        show: false,
      });
    },
    resetErrorValue() {
      if (this.userNameErrors != "") {
        this.userNameErrors = "";
      } else if (this.emailErrors != "") {
        this.emailErrors = "";
      } else if (this.passwordConfirmationErrors != "") {
        this.passwordConfirmationErrors = "";
      } else if (this.passwordErrors != "") {
        this.passwordErrors = "";
      }
    },
  },
};
</script>

<style></style>
