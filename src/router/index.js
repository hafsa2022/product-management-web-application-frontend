import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import signUpView from "../views/SignUpView.vue";
import AddProductView from "../views/AddProductView.vue";
import EditProductView from "../views/EditProductView.vue";
import ViewProductView from "../views/ViewProductView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: AddProductView,
  },
  {
    path: "/editproduct",
    name: "addproduct",
    component: EditProductView,
  },
  {
    path: "/viewproduct",
    name: "viewproduct",
    component: ViewProductView,
  },
  {
    path: "/signup",
    name: "signup",
    component: signUpView,
  },

  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
