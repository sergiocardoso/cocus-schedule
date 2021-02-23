<template>
  <div class="container-fluid">
    <div
      class="row justify-content-center align-items-center cocus-header"
      style="height: 100px"
    >
      <div class="col-12 text-center" style="color: white" v-if="dataTemp">
        <h3>{{dataTemp.user.name}}</h3>
        <h4>{{dataTemp.user.email}}</h4>
      </div>
    </div>

    <div class="col-12 cocus-toolbar row justify-content-center">
      <div
        class="btn-group btn-group-lg"
        role="group"
        aria-label="Basic example"
      >
        
        <button type="button" class="btn btn-outline-link btn-menu" @click="goto('Home')" v-if="checkRoute('Home')">
          <font-awesome-icon icon="calendar-alt" />
        </button>

        <button type="button" class="btn btn-outline-link btn-menu" v-if="checkRoute('User')">
          <font-awesome-icon icon="user" @click="goto('User')" />
        </button>

        <button type="button" class="btn btn-outline-link btn-menu" @click="addItem()" v-if="checkRoute('User')">
          <font-awesome-icon icon="plus" />
        </button>
        
        <button type="button" class="btn btn-outline-link btn-menu" @click="logout()">
          <font-awesome-icon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Swal from "sweetalert2";
import { Component, Vue } from "vue-property-decorator";
import { onLogout } from "./../services/Auth";

@Component
export default class Header extends Vue {

    data = localStorage.getItem('LoggedUser') ?? "";
    dataTemp: any = null;
    parent: any;

    mounted(){
        this.dataTemp = JSON.parse(this.data);
        this.parent = this.$parent as ParentSchedule;
    }

    addItem(){
      this.parent.newSchedule();
    }

    goto(url: string): void{
      if(url === 'Home'){
        this.$router.push('/');
        return;
      }
      this.$router.push(url);
    }

    checkRoute(type: string): boolean{
      if(this.$route.name === type){
        return false;
      }
      return true;
    }

    logout(){
      Swal.fire({
        title: "Exit",
        text: "voce deseja sair do sistema?",
        showCancelButton: true
      })
      .then(response => {
        if(response.isConfirmed){
          localStorage.removeItem('LoggedUser');
          Vue.$toast.open({
                message: "Saindo do sistema",
                type: "success",
          });
          this.$router.push('/login');
        }
      })
    }
    
}

interface ParentSchedule extends Vue {
  newSchedule(): void;
}
</script>
