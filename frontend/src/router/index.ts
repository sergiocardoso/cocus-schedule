import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

import { isLogged } from './../services/Auth';

// pages
import Login from "./../views/Login.vue";
import SignIn from "./../views/SignIn.vue";
import UserPage from "./../views/User.vue";

Vue.use(VueRouter);

function guardMyRoute(to: any, from: any, next: any) {
  const isAuthenticate = localStorage.getItem("LoggedUser") ? true : false;
  console.log("entrou aqui", isAuthenticate);

  if (isAuthenticate) {
    next();
  } else {
    next("/login");
  }
}

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: guardMyRoute,
  },
  {
    path: "/user",
    name: "User",
    component: UserPage,
    beforeEnter: guardMyRoute
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
