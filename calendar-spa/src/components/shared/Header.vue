<template>
  <div class="container">
    <section class="hero is-small is-primary">
      <div class="hero-body">
        <div class="container columns is-vcentered">
          <div class="column is-one-quarter has-text-left">
            <a class="has-text-white" @click="prevMonth()">&#10094;</a>
          </div>
          <div class="column is-half has-text-centered">
            <h1 class="title">{{ monthName }}</h1>
            <h2 class="subtitle">{{ date | formatDateYear }}</h2>
          </div>
          <div class="column is-one-quarter has-text-right">
            <a class="has-text-white" @click="nextMonth()">&#10095;</a>
          </div>
        </div>
      </div>
    </section>
    <calendar-week></calendar-week>
    <calendar-days :currentMonth="month"></calendar-days>
  </div>
</template>

<script>
import moment from "moment-timezone";
import Calendar from '../../calendarModules/calendar';
import CalendarWeek from "./Week.vue";
import CalendarDays from "./DaysMonth.vue";

export default {
  components: {
    CalendarWeek,
    CalendarDays
  },
  data() {
    return {
      date: {},
      timer: undefined,
      now: {},
      month: {}
    };
  },
  methods: {
    nextMonth() {
      this.date = this.date.clone().add(1, "months");
    },
    prevMonth() {
      this.date = this.date.clone().subtract(1, "months");
    }
  },
  filters: {
    formatDateYear(val) {
      return val != undefined ? val.format("YYYY") : "";
    }
  },
  created() {
    console.log("created calendar header");
    this.date = moment(Date.now()).tz("America/Mexico_City");
  },
  computed: {
    monthName () {
      return this.month.name;
    }
  },
  watch: {
    date (newVal) {
      console.log("on watch date-->", newVal);
      let calendar = new Calendar(newVal);
      this.month = calendar.generateMonth();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>