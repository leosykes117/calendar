<template>
  <div class="container is-clipped">
    <calendar-header msg="Welcome to Your Vue.js App" @select="newEvent" />
    <button id="btnAddEvent" class="button is-primary is-rounded is-large" v-show="showButton" @click="showModal()">
      <font-awesome-icon icon="calendar-plus" />
    </button>
    <calendar-modal :active="modal" :inDate="eventDate" @show="closeModal"/>
  </div>
</template>
<script>
// @ is an alias to /src
import CalendarHeader from "@/components/shared/Header.vue";
import CalendarModal from "@/components/shared/Modal.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendarPlus);

export default {
  name: "home",
  components: {
    CalendarHeader,
    CalendarModal,
    FontAwesomeIcon
  }, 
  data () {
    return {
      showButton: false,
      modal: false,
      eventDate: {}
    }
  },
  methods: {
    newEvent (date, state) {
      console.log("LISTEN EVENT", date, state);
      this.showButton = state
      this.eventDate = date; 
    },
    showModal () {
      this.modal = true;
    },
    closeModal () {
      this.modal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#btnAddEvent {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  right: 30px; /* Place the button 30px from the right */
  /*z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  cursor: pointer; /* Add a mouse pointer on hover */
}
</style>
