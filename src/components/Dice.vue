<template>
  <div>
    <h1>{{ currentLetter }}</h1>

    <h4 v-if="timer != 0">Time left: {{ timer }}</h4>

    <button
      v-if="timer === 0"
      class="btn btn-outline-secondary mb-2 btn-lg"
      @click="startRound"
    >{{ buttonText }}</button>

    <div class="fixed-bottom">
      <div class="card">
        <div class="card-body">
          <h4>
            <span
              v-for="(letter, k) in diceAlphabet"
              :key="k"
              class="mx-1"
              :class="{'used-letter': checkIfUsed(letter)}"
            >{{ letter }}</span>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      diceAlphabet: [],
      currentLetter: "-",

      buttonText: "Start",
      secondsInRound: 120,
      timer: 0
    };
  },
  
  created() {
    this.diceAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  },

  methods: {
    checkIfUsed(l) {
      const usedLetters = this.$store.getters.usedLetters;
      const letterUsed = usedLetters.find(letter => l === letter);

      if (letterUsed) {
        return true;
      }
      return false;
    },

    isGameOver() {
      return this.$store.getters.roundNumber === 0;
    },

    startRound() {
      // Retrieve all unused letters and select one at random
      const usedLetters = this.$store.getters.usedLetters;

      const possibleLetters = this.diceAlphabet.filter(
        letter => !usedLetters.includes(letter)
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
.used-letter {
  color: #edefee;
}
</style>
 
