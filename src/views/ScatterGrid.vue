<template>
  <div class="mt-3">
    <div class="row justify-content-between">
      <div class="col-sm-4">
        <app-dice></app-dice>
      </div>
      <div class="col-sm-6 mb-5">
        <h2>Round No: {{ round + 1 }}</h2>

        <transition name="fade" mode="out-in">
          <app-questions v-if="isStarted" :round="round"></app-questions>
        </transition>
        <br>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from "../components/Dice.vue";
import Questions from "../components/Questions.vue";

export default {
  components: {
    appDice: Dice,
    appQuestions: Questions
  },

  computed: {
    round() {
      return this.$store.getters.roundNumber;
    },
    isStarted() {
      return this.$store.getters.roundStarted;
    }
  }
};
</script>
 
<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 800ms;
}

.fade-leave-active {
  transition: opacity 800ms;
  opacity: 0;
}
</style>
 
