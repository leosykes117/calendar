<template>
  <div class="modal" :class="{'is-active': active}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Crear evento</p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <input type="text" 
              class="input is-rounded" 
              :value="eventDate" 
              placeholder="Nombre del evento"
              readonly />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <div class="select is-rounded">
              <select>
                <option selected="selected">Evento</option>
                <option>Cumpleaños</option>
                <option>Aniversario</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input type="text" class="input is-rounded" placeholder="Nombre del evento" />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">
          <font-awesome-icon icon="check" />
        </button>
        <button class="button is-danger" @click="close">
          <font-awesome-icon icon="times" />
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import moment from "moment-timezone"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faCheck);

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    inDate: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit("show");
    }
  },
  computed: {
    eventDate () {
      var moment_date = moment(this.inDate.timeStamp);
      moment_date.date(this.inDate.index);
      return moment_date.locale('es').format('dddd, D MMMM YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>