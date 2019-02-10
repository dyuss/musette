<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-title class="white--text">Таблица</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-data-table
        :headers="tableHeaders"
        :items="tableItems"
        hide-actions
        class="ttable"
      >
        <template slot="headers" slot-scope="props">
          <th v-for="header in props.headers" :key="header.text">
            <span v-html="header.text"></span>
          </th>
        </template>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td :class="totalClass(props.item.totalByPairs)">
            {{ props.item.totalByPairs }}
          </td>
          <td :class="totalClass(props.item.total)">{{ props.item.total }}</td>
          <td>{{ props.item.spent }}</td>
          <td v-for="p in purchases" :key="p.id">{{ props.item[p.id] }}</td>
        </template>
      </v-data-table>
      <BottomNav current="table" />
    </v-content>
  </v-app>
</template>

<script>
import store from '../store.js';
import BottomNav from '@/components/BottomNav.vue';

export default {
  components: {
    BottomNav,
  },
  data() {
    return {
      persons: store.persons,
      purchases: store.purchases,
    };
  },
  computed: {
    personsByPairs() {
      return this.persons;
    },
    tableHeaders() {
      const name = {text: 'Имя', value: 'name', sortable: false};
      const spent = {text: 'Потратил', value: 'spent', sortable: false};
      const total = {text: 'Итого', value: 'total', sortable: false};
      const totalByPairs = {
        text: 'Итого<br/>(пары)',
        value: 'totalByPairs',
        sortable: false,
      };
      const purchases = this.purchases.map(p => {
        return {
          text: `${p.title}<br/>(${p.cost})`,
          value: p.id,
          sortable: false,
        };
      });

      return [name, totalByPairs, total, spent, ...purchases];
    },
    tableItems() {
      let items = this.persons.map(p => {
        let item = {
          name: p.name,
          spent: this.spent(p),
          total: this.spent(p),
          totalByPairs: 0,
        };
        for (let pur of this.purchases) {
          const debt = this.forPurchase(p, pur);
          item[pur.id] = debt;
          item.total -= debt;
        }
        item.totalByPairs = item.total;
        return item;
      });
      this.persons.forEach(p => {
        if (!p.pair) {
          return;
        }
        let total = this.getItemByPersonId(items, p.id).total;
        let totalPair = this.getItemByPersonId(items, p.pair).total;
        const delta = total + totalPair;
        if (Math.abs(total) > Math.abs(totalPair)) {
          totalPair = 0;
          total = delta;
        } else {
          total = 0;
          totalPair = delta;
        }
        this.getItemByPersonId(items, p.id).totalByPairs = total;
        this.getItemByPersonId(items, p.pair).totalByPairs = totalPair;
      });
      return items;
    },
  },
  methods: {
    forPurchase(person, purchase) {
      if (!purchase.share.includes(person.id)) {
        return 0;
      }

      return Math.ceil(purchase.cost / purchase.share.length);
    },
    spent(person) {
      return this.purchases.reduce((a, p) => {
        return p.who == person.id ? a + p.cost : a;
      }, 0);
    },
    totalClass(total) {
      let cl = '';
      if (total > 0) cl = 'green lighten-4';
      if (total < 0) cl = 'red lighten-4';
      return cl;
    },
    getPersonById(id) {
      return this.persons.find(p => p.id == id);
    },
    getItemByPersonId(items, id) {
      const p = this.getPersonById(id);
      return items.find(it => it.name == p.name);
    },
  },
};
</script>

<style>
.ttable {
  margin-bottom: 70px;
}
</style>
