<template>
  <div>
    <Header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "./../components/Logo.vue";
import Header from "./../components/Header.vue";
import { list as ScheduleList } from "./../services/Schedule";
import ISchedule from "@/model/Schedule.interface";

@Component({
  components: {
    Logo,
    Header,
  },
})
export default class Home extends Vue {
  schedules: ISchedule[] = [];

  mounted() {
    ScheduleList()
      .then(res => console.log('res acime', res));
  }
}
</script>

<style lang="scss">
#app {
  background: whitesmoke !important;
}
</style>