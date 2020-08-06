import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roundNumber: 0,
    roundStarted: false,

    usedLetters: []
  },

  mutations: {
    "START-ROUND"(state) {
      state.roundStarted = true;
    },

    "END-ROUND"(state) {
      state.roundStarted = false;
      if (state.roundNumber < 17) {
        state.roundNumber++;
      } else {
        state.roundNumber = 0;
        state.usedLetters = [];
      }
    },

    "LETTER-USED"(state, letter) {
      state.usedLetters.push(letter);
    }
  },

  actions: {
    startRound: ({ commit }) => {
      commit("START-ROUND");
    },

    endRound: ({ commit }) => {
      commit("END-ROUND");
    },

    letterUsed: ({ commit }, payload) => {
      commit("LETTER-USED", payload);
    }
  },

  getters: {
    roundNumber(state) {
      return state.roundNumber;
    },

    roundStarted(state) {
      return state.roundStarted;
    },

    usedLetters(state) {
      return state.usedLetters;
    }
  }
});
