import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    ]
  },
  mutations: {
    createPerson(state, person) {
      state.persons.push(person)
    }
  },
  actions: {

  }
})

/*const oldStore = {
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
*/
