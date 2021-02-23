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
        
        <button type="button" class="btn btn-outline-link btn-menu">
          <font-awesome-icon icon="calendar-alt" />
        </button>

        <button type="button" class="btn btn-outline-link btn-menu">
          <font-awesome-icon icon="user" />
        </button>

        <button type="button" class="btn btn-outline-link btn-menu">
          <font-awesome-icon icon="plus" />
        </button>
        
        <button type="button" class="btn btn-outline-link btn-menu">
          <font-awesome-icon icon="sign-out-alt" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {

    data = localStorage.getItem('LoggedUser') ?? "";
    dataTemp: any = null;

    mounted(){
        this.dataTemp = JSON.parse(this.data);
    }
    
}
</script>
