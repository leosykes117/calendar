<template>
  <ul class="weekdays">
    <li v-for="weekDay in weeksDays" :key="weekDay.id">{{ weekDay }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      weeksDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sab"]
    };
  }
};
</script>

<style lang="scss" scoped>
.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #ddd;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  color: #666;
  text-align: center;
}
</style>