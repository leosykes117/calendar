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
      months: {
        "1": {
          name: "Enero",
          days: 31
        },
        "2": {
          name: "Febrero",
          days: 28
        },
        "3": {
          name: "Marzo",
          days: 31
        },
        "4": {
          name: "Abril",
          days: 30
        },
        "5": {
          name: "Mayo",
          days: 31
        },
        "6": {
          name: "Junio",
          days: 30
        },
        "7": {
          name: "Julio",
          days: 31
        },
        "8": {
          name: "Agosto",
          days: 31
        },
        "9": {
          name: "Septiembre",
          days: 30
        },
        "10": {
          name: "Octubre",
          days: 31
        },
        "11": {
          name: "Noviembre",
          days: 30
        },
        "12": {
          name: "Diciembre",
          days: 31
        }
      },
      month: {}
    };
  },
  methods: {
    nextMonth() {
      this.date = this.date.clone().add(1, "months");
    },
    prevMonth() {
      this.date = this.date.clone().subtract(1, "months");
    },
    zeller(month, year) {
      let a = Math.trunc((14 - month) / 12);
      let y = year - a;
      let m = month + 12 * a - 2;
      let day = 1;
      let h =
        (day +
          y +
          Math.trunc(y / 4) -
          Math.trunc(y / 100) +
          Math.trunc(y / 400) +
          Math.trunc((31 * m) / 12)) %
        7;
      return Math.trunc(h);
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
    console.log(this.date.format("LL"));
  },
  computed: {
    monthName() {
      return this.months[this.date.month() + 1].name;
    }
  },
  watch: {
    date(newVal) {
      this.$set(this.month, "data", this.months[newVal.month() + 1]);
      this.$set(this.month, "momentDate", newVal.clone());
      this.$set(
        this.month,
        "startDayOfWeek",
        this.zeller(newVal.month() + 1, newVal.year())
      );
      console.log("MONTH: ", this.month);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>