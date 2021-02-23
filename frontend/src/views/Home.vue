<template>
  <div>
    <Header />
    <div>
      <div v-if="schedules.length === 0" class="tip">
        You don't have any schedule, click on plus button to add
      </div>

      <ul class="schedules">
        <li v-for="(schedule, k) in schedules" :key="k" class="schecule-animated">
          <div class="row justify-content-between schedule_base">
            <div class="col-sm-auto col-4 schedule_date" v-if="schedule.dateFormat">
              <div class="day">{{ schedule.dateFormat.getDate() + 1}}</div>
              <div class="week">
                {{ monthNames[schedule.dateFormat.getMonth()] }}
              </div>
              <div class="year">
                {{ schedule.dateFormat.getFullYear() }}
              </div>
            </div>
            <div class="col-sm-auto col-7 schedule_text">
              <div class="title">{{ schedule.title }}</div>
              <div class="description">{{ schedule.description }}</div>
            </div>
            <div class="col-sm-auto col-12 text-right">
              <button
                class="btn btn-outline-link btn-menu-schedule"
                @click="deleteSchedule(k)"
              >
                <font-awesome-icon icon="trash-alt" />
              </button>
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
import {
  list as ScheduleList,
  deleteItem as ScheduleDelete,
  addItem as ScheduleNewItem,
} from "./../services/Schedule";
import ISchedule from "@/model/Schedule.interface";
import Swal from "sweetalert2";

@Component({
  components: {
    Logo,
    Header,
  },
})
export default class Home extends Vue {
  schedules: ISchedule[] = [];
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  mounted() {
    ScheduleList().then(
      (res) =>
        (this.schedules = res.map((resItem) => {
          resItem.date = new Date(resItem.date).getTime();
          resItem.dateFormat = new Date(resItem.date);
          return resItem;
        }))
    );
  }

  newSchedule(): void {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"],
    })
      .queue([
        {
          title: "Event Date",
          text: "Type the event date",
          input: "text",
          inputPlaceholder: "dd-mm-yyyy",
        },
        {
          title: "Event Title",
          text: "Type the event date",
          input: "text",
          inputPlaceholder: "type the title",
        },
        {
          title: "Event Date",
          text: "Type the event date",
          confirmButtonText: "Finish",
          input: "textarea",
          inputPlaceholder: "type the description from this event",
        },
      ])
      .then((result: any) => {
        if (result.value) {
          const dateTemp = new Date(
            result.value[0].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
          );

          const scheduleItem: ISchedule = {
            date: dateTemp.getTime(),
            title: result.value[1],
            description: result.value[2],
          };

          ScheduleNewItem(scheduleItem)
            .then(() => {
              scheduleItem.dateFormat = new Date(scheduleItem.date);
              this.schedules.push(scheduleItem);
              Vue.$toast.open({
                message: "Item add with success!",
                type: "success",
              });
            })
            .catch((error) => {
              console.log("error", error);
              Vue.$toast.open({
                message: "Was not possible to add this schedule item",
                type: "error",
              });
            });
        }
      });
  }

  /**
   * Delete Schedule
   * @param key number -> index from Schedules array
   */
  deleteSchedule(key: number): void {
    Swal.fire({
      title: "Delete this schedule?",
      text: "Are you sure that want to delete this item?",
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        ScheduleDelete(this.schedules[key].id)
          .then(() => {
            this.schedules = this.schedules.filter(
              (scheduleTemp) => scheduleTemp !== this.schedules[key]
            );
            Vue.$toast.open({
              message: "Schedule deleted - success",
              type: "success",
            });
          })
          .catch((error) =>
            Vue.$toast.open({
              message: "Was not possible to delete this schedule item",
              type: "error",
            })
          );
      }
    });
  }
}
</script>

<style lang="scss" >
#app {
  background: whitesmoke;
}
</style>