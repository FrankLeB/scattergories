<template>
  <div>
    <h1>{{ currentLetter }}</h1>

    <h4 v-if="timer != 0">Time left: {{ timer }}</h4>

    <button
      v-if="timer === 0"
      class="btn btn-outline-secondary mb-2 btn-lg"
      @click="startRound"
    >{{ buttonText }}</button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLetter: "-",

      buttonText: "Start",
      secondsInRound: 120,
      timer: 0
    };
  },

  computed: {
    diceAlphabet() {
      return this.$store.getters.diceAlphabet;
    },

    usedLetters() {
      return this.$store.getters.usedLetters;
    }
  },
  
  methods: {
    isGameOver() {
      return this.$store.getters.roundNumber === 0;
    },

    startRound() {
      const possibleLetters = this.diceAlphabet.filter(
        letter => !this.usedLetters.includes(letter)
      );
      const letterIndex = Math.floor(Math.random() * possibleLetters.length);

      this.currentLetter = possibleLetters[letterIndex];
      this.$store.dispatch("letterUsed", this.currentLetter);

      // Start the round
      this.$store.dispatch("startRound");
      this.buttonText = "Round Started";
      this.timer = this.secondsInRound;
      let interval = setInterval(() => {
        this.timer--;

        // Round is done, send signal
        if (this.timer === 0) {
          this.$store.dispatch("endRound");

          if (!this.isGameOver()) {
            this.buttonText = "Next Letter";
          } else {
            this.currentLetter = "-";
            this.buttonText = "Game Over. Click here to start again.";
          }

          clearInterval(interval);
        }
      }, 1000);
    }
  }

};
</script>
 
<style scoped>
</style>
 
