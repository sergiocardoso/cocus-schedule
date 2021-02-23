<template>
  <div>
    <Header />
    <div class="container">
      <div class="row justify-content-center" style="margin-top:5%;">
          <form class="col-12 col-sm-8 col-md-4 text-sm-left" @submit="submit">
        <h4 class="text-black">Edit your data information</h4>
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
          Update Information
        </button>
      </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "./../components/Logo.vue";
import Header from "./../components/Header.vue";
import { onSingup, onUpdate } from "./../services/Auth";

@Component({
  components: {
    Logo,
    Header,
  },
})
export default class UserPage extends Vue {
    user  = {
    name: "",
    email: "",
    password: "",
    retypePassword: ""
  };

  valid = false;

  mounted() {
      const data = localStorage.getItem('LoggedUser');
      const dataParse = JSON.parse(data || "");

      if(dataParse){
          this.user.name = dataParse.user.name;
          this.user.email = dataParse.user.email;
      }
  }

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

    onUpdate(this.user)
      .then(() => {
        Vue.$toast.open("Informações atualizadas com sucesso");
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

<style lang="scss" >
#app {
  background: whitesmoke;
}
</style>