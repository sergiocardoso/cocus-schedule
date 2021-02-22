<template>
  <div class="container h-100">
    <div
      class="row justify-content-center justify-content-sm-center align-items-sm-center align-items-start h-100 page-base"
    >
      <div class="col-12 col-sm-4">
        <Logo />
      </div>

      <form class="col-12 col-sm-8 col-md-4 text-sm-left" @submit="submit">
        <h4 class="text-white">Login</h4>
        <div class="input-group input-group-lg">
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="type your e-mail"
          />
        </div>

        <div class="input-group input-group=lg">
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="type your password"
          />
        </div>

        <button
          class="btn btn-primary btn-large btn-margin"
          :disabled="isValidForm"
        >
          Enter on Cocus
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import Logo from "./../components/Logo.vue";
import IUser from "./../model/User.interface";
import { onLogin } from "./../services/Auth";

Vue.use(VueToast);

@Component({
  components: { Logo },
})
export default class Home extends Vue {
  user: IUser = {
    email: "",
    password: "",
  };

  valid = false;

  get isValidForm(): boolean {
    return this.user.email && this.user.password ? false : true;
  }

  submit(): void {
    onLogin(this.user)
      .then((response) => {
        Vue.$toast.success("Data OK =)");
        this.$router.push('/home');
      })
      .catch(() => {
        this.user.email = "";
        this.user.password = "";
        Vue.$toast.open({
          message: "Wrong data, try again",
          type: "error",
        });
      });
  }
}
</script>

<style lang="scss">
@import "./../assets/sass/variables";
@import "./../assets/sass/animations";

#app {
  background: linear-gradient(232deg, #001af2, #a300ff, #0081ff);
  background-size: 600% 600%;
  -webkit-animation: AnimationName 2s ease infinite;
  -moz-animation: AnimationName 2s ease infinite;
  -o-animation: AnimationName 2s ease infinite;
  animation: AnimationName 2s ease infinite;
}
</style>
