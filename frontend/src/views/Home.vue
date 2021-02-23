<template>
  <div>
    <Header />
    <div>
      <ul class="schedules">
        <li v-for="(schedule, k) in schedules" :key="k">
          <div class="row justify-content-between schedule_base">
            <div class="col-auto schedule_date">
              <div class="day">15</div>
              <div class="week">Sunday</div>
            </div>
            <div class="col-auto schedule_text">
              <div class="title">{{schedule.title}}</div>
              <div class="description">{{schedule.description}}</div>
            </div>
            <div class="col-auto text-right">
              <button class="btn btn-outline-link btn-menu" style="color:white;"><font-awesome-icon icon="trash-alt" /></button>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
      .then(res => this.schedules = res.map(resItem => {
        resItem.date = new Date(resItem.date);
        return resItem;
      }));
  }
}
</script>

<style lang="scss" >
#app {
  background: whitesmoke;
}
</style>