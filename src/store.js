import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const mockStore = {
  persons: [
    { id: '13fe652751f73', name: 'Лили', days: 2, pair: '1a00fc87b1832' },
    { id: '1a00fc87b1832', name: 'Маршал', days: 2, pair: '13fe652751f73' },
    { id: '936512921cdfb', name: 'Тед', days: 2 },
    { id: 'a67da33cdbc55', name: 'Робин', days: 1 },
    { id: '8acd7ed98dfcd', name: 'Барни', days: 1 },
  ],
  purchases: [
    {
      id: '7172643af9f4f',
      title: 'Синяя валторна',
      cost: 2100,
      who: '936512921cdfb',
      share: [
        '936512921cdfb',
        'a67da33cdbc55',
      ],
    },
    {
      id: '1a00fc87b1832',
      title: 'Сэндвичи',
      cost: 1200,
      who: '13fe652751f73',
      share: ['13fe652751f73', '1a00fc87b1832', '936512921cdfb'],
    },
    {
      id: 'ec0a2c0611386',
      title: 'Билеты на хоккей',
      cost: 1620,
      who: 'a67da33cdbc55',
      share: [
        '13fe652751f73',
        '1a00fc87b1832',
        '936512921cdfb',
        'a67da33cdbc55',
        '8acd7ed98dfcd',
      ],
    },
  ],
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  state: {
    persons: mockStore.persons,
    purchases: mockStore.purchases
  },
  getters: {
    getPersonById: state => id => {
      return state.persons.find(p => p.id == id)
    },
    getPersonByName: state => name => {
      return state.persons.find(p => p.name == name)
    },
    getPurchaseById: state => id => {
      return state.purchases.find(p => p.id == id)
    }
  },
  mutations: {
    createPerson(state, person) {
      if (person.pair) {
        state.persons.forEach(p => {
          if (p.id == person.pair) p.pair = person.id;
          if (p.pair == person.pair) p.pair = undefined;
        });
      }
      state.persons.push(person)
    },
    deletePerson(state, id) {
      state.persons = state.persons.filter(p => p.id != id);

      state.persons.forEach(p => {
        if (p.pair == id) p.pair = undefined;
      });

      state.purchases = state.purchases.map(p => {
        if (p.share.includes(id)) {
          p.share = p.share.filter(s => s != id);
        }
        return p;
      });

      state.purchases = state.purchases.filter(p => p.who != id);
    },
    updatePerson(state, person) {
      state.persons.forEach((p, i) => {
        if (p.pair == person.id || p.pair == person.pair)
          p.pair = undefined;
        if (p.id == person.pair) p.pair = person.id;
        if (p.id == person.id) state.persons[i] = person;
      });
    },
    createPurchase(state, purchase) {
      state.purchases.push(purchase);
    },
    updatePurchase(state, purchase) {
      const index = state.purchases.findIndex(p => p.id == purchase.id);
      state.purchases[index] = purchase;

    },
    deletePurchase(state, id) {
      state.purchases = state.purchases.filter(p => p.id != id);
    }
  },
  actions: {

  }
})