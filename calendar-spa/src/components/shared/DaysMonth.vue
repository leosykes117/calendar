<template>
  <ul v-if="totalDaysMonth != 0" class="days">
    <li v-for="(item, index) in totalDaysMonth" :key="index">
      <a v-if="item > currentMonth.startDayOfWeek">{{ item - currentMonth.startDayOfWeek }}</a>
      <a v-else></a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentMonth: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    totalDaysMonth () {
      console.log("on computed");
      if (this.currentMonth.momentDate != undefined) {
        if (
          this.currentMonth.momentDate.month() == 1 &&
          this.currentMonth.momentDate.isLeapYear()
        ) {
          return (
            this.currentMonth.data.days + 1 + this.currentMonth.startDayOfWeek
          );
        }
        return this.currentMonth.data.days + this.currentMonth.startDayOfWeek;
      }
      return 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.days {
  padding: 10px 0;
  background: #eee;
  margin: 0;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  margin-bottom: 5px;
  font-size: 12px;
  color: #777;
}

/* Highlight the "current" day */
.days li .active {
  padding: 5px;
  background: #1abc9c;
  color: white !important;
}
</style>