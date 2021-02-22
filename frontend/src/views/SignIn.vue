<template>
  <div class="container h-100">
    <div
      class="row justify-content-center justify-content-sm-center align-items-sm-center align-items-start h-100 page-base"
    >
      <div class="col-12 col-sm-4">
        <Logo />
      </div>

      <form class="col-12 col-sm-8 col-md-4 text-sm-left" @submit="submit">
        <h4 class="text-white">New Account</h4>
        <div class="input-group input-group-lg">
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="type your name"
          />
        </div>

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
          <input
            v-model="user.retypePassword"
            type="password"
            class="form-control"
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="retype your password"
          />
        </div>

        <button
          class="btn btn-primary btn-large btn-margin"
          :disabled="isValidForm"
        >
          Sing In Cocus Schedule
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "vue-toast-notification/dist/theme-sugar.css";

import Logo from "./../components/Logo.vue";
import { onSingup } from "./../services/Auth";

@Component({
  components: {Logo},
})
export default class SignIn extends Vue {
  user  = {
    name: "",
    email: "",
    password: "",
    retypePassword: ""
  };

  valid = false;

  get isValidForm(): boolean {
    return  this.user.email && 
            this.user.password && 
            this.user.name && 
            this.user.retypePassword 
            ? false : true;
  }

  submit(): void {

    // passwords are equals
    if(this.user.password !== this.user.retypePassword){
        Vue.$toast.open({message: 'Passwords are differents', type:'error' });
        return;
    }

    onSingup(this.user)
      .then(() => {
        Vue.$toast.open("Registration successfully Complete");
        this.$router.push('/login');
      })
      .catch(() => {
        this.user.email = "";
        this.user.password = "";
        this.user.name = "";
        this.user.retypePassword = "";

        Vue.$toast.open({
          message: "Wrong data, try again",
          type: "error",
        });
      });
  }
}
</script>
