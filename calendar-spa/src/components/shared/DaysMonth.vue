<template>
  <ul v-if="currentMonth.length != 0" class="days">
    <li v-for="(item, index) in currentMonth.days" :key="index">
      <a :class="item.useClass" @click="selectDate(item)">{{ item.index }}</a>
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
  methods: {
    selectDate (day) {
      this.$emit('select', day)
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
  border-radius: 5px;
  padding: 5px;
}
</style>