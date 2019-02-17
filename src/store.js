import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mockStore = {
  persons: [
    { id: '13fe652751f73', name: 'Блонд', days: 2, pair: '1a00fc87b1832' },
    {
      id: '1a00fc87b1832',
      name: 'Сёмочкин Дима',
      days: 2,
      pair: '13fe652751f73',
    },
    { id: '80fec5b44c18d', name: 'Дюс', days: 2, pair: '73ed10d1afc0d' },
    { id: '73ed10d1afc0d', name: 'Люда', days: 2, pair: '80fec5b44c18d' },
    { id: '936512921cdfb', name: 'Илья', days: 2 },
    { id: 'a67da33cdbc55', name: 'Вови', days: 1 },
    { id: '8acd7ed98dfcd', name: 'Ель', days: 1 },
    { id: 'd5948a9796a9b', name: 'Атанова', days: 2, pair: '1e5bc3eaf77e3' },
    { id: '1e5bc3eaf77e3', name: 'Костян', days: 2, pair: 'd5948a9796a9b' },
  ],
  purchases: [
    {
      id: '7172643af9f4f',
      title: 'Продукты Блонды',
      cost: 2100,
      who: '13fe652751f73',
      share: [
        '13fe652751f73',
        '1a00fc87b1832',
        '80fec5b44c18d',
        '73ed10d1afc0d',
        '936512921cdfb',
        'a67da33cdbc55',
        '8acd7ed98dfcd',
        'd5948a9796a9b',
        '1e5bc3eaf77e3',
      ],
    },
    {
      id: '5277c33d85f7f',
      title: 'Ром с колой',
      cost: 1200,
      who: '13fe652751f73',
      share: ['80fec5b44c18d', '1a00fc87b1832', '936512921cdfb'],
    },
    {
      id: 'ec0a2c0611386',
      title: 'Продукты Люда',
      cost: 1620,
      who: '73ed10d1afc0d',
      share: [
        '13fe652751f73',
        '1a00fc87b1832',
        '80fec5b44c18d',
        '73ed10d1afc0d',
        '936512921cdfb',
        'a67da33cdbc55',
        '8acd7ed98dfcd',
        'd5948a9796a9b',
        '1e5bc3eaf77e3',
      ],
    },
    {
      id: 'ce29966fe7b81',
      title: 'Мясо',
      cost: 1100,
      who: '8acd7ed98dfcd',
      share: [
        '13fe652751f73',
        '1a00fc87b1832',
        '80fec5b44c18d',
        '73ed10d1afc0d',
        '936512921cdfb',
        'a67da33cdbc55',
        '8acd7ed98dfcd',
        'd5948a9796a9b',
        '1e5bc3eaf77e3',
      ],
    },
    {
      id: 'b256e27d525a9',
      title: 'Бабское бухло',
      cost: 990,
      who: '8acd7ed98dfcd',
      share: [
        '8acd7ed98dfcd',
        'd5948a9796a9b',
        '73ed10d1afc0d',
        '13fe652751f73',
      ],
    },
  ],
};

export default new Vuex.Store({
  strict: true,
  state: {
    persons: mockStore.persons,
    purchases: mockStore.purchases
  },
  getters: {
    getPersonById: state => id => {
      return state.persons.find(p => p.id == id)
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