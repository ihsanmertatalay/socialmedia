// store.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 10,
      a : 100
    };
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    decrement(context) {
      context.commit('decrement');
    }
  },
  getters: {
    getCounter(state) {
      return state.counter;
    },
    getA(state) {
        return state.a;
      }
  }
});

export default store;
