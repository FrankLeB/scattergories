<template>
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
</template>

<script>
export default {
  computed: {
    diceAlphabet() {
      return this.$store.getters.diceAlphabet;
    },

    usedLetters() {
      return this.$store.getters.usedLetters;
    }
  },

  methods: {
    checkIfUsed(l) {
      const usedLetters = this.usedLetters;
      const letterUsed = usedLetters.find(letter => l === letter);

      if (letterUsed) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.used-letter {
  color: #edefee;
}
</style>
