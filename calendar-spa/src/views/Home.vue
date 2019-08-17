<template>
  <calendar-header msg="Welcome to Your Vue.js App"/>
</template>

<script>
// @ is an alias to /src
import CalendarHeader from '@/components/shared/Header.vue'

export default {
  name: 'home',
  components: {
    CalendarHeader
  }
}
</script>
