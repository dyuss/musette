<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-title class="white--text">Таблица</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-data-table :headers="tableHeaders" :items="tableItems" hide-actions class="ttable">
        <template slot="headers" slot-scope="props">
          <th v-for="header in props.headers" :key="header.text">
            <span v-html="header.text"></span>
          </th>
        </template>
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="debtor">
            <v-checkbox height="48" v-model="props.item.isDebtor" @change="toggleDebtor(props.item)"></v-checkbox>
          </td>
          <td :class="totalClass(props.item.totalByPairs)">{{ props.item.totalByPairs }}</td>
          <td :class="totalClass(props.item.total)">{{ props.item.total }}</td>
          <td>{{ props.item.spent }}</td>
          <td v-for="p in purchases" :key="p.id">{{ props.item[p.id] }}</td>
        </template>
      </v-data-table>
      <BottomNav current="table"/>
    </v-content>
  </v-app>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    BottomNav
  },
  computed: {
    ...mapState(["persons", "purchases"]),
    ...mapGetters(["getPersonById", "getPersonByName"]),
    tableHeaders() {
      const name = { text: "Имя", value: "name", sortable: false };
      const isDebtor = { text: "Сдал", value: "isDebtor", sortable: false };
      const spent = { text: "Потратил", value: "spent", sortable: false };
      const total = { text: "Итого", value: "total", sortable: false };
      const totalByPairs = {
        text: "Итого<br/>(пары)",
        value: "totalByPairs",
        sortable: false
      };
      const purchases = this.purchases.map(p => {
        return {
          text: `${p.title}<br/>(${p.cost})`,
          value: p.id,
          sortable: false
        };
      });
      return [name, isDebtor, totalByPairs, total, spent, ...purchases];
    },
    tableItems() {
      let items = this.persons.map(p => {
        let item = {
          name: p.name,
          isDebtor: p.isDebtor,
          spent: this.getSpending(p),
          total: this.getSpending(p)
        };
        for (let pur of this.purchases) {
          const debt = this.getDebtForPurchase(p, pur);
          item[pur.id] = debt;
          item.total -= debt;
        }
        item.totalByPairs = item.total;
        return item;
      });
      this.getTotalByPairs(items);
      return items;
    }
  },
  methods: {
    ...mapMutations(["updatePerson"]),
    getDebtForPurchase(person, purchase) {
      if (!purchase.share.includes(person.id)) return 0;
      return Math.ceil(purchase.cost / purchase.share.length);
    },
    getSpending(person) {
      return this.purchases.reduce((a, p) => {
        return p.who == person.id ? a + p.cost : a;
      }, 0);
    },
    totalClass(total) {
      if (total > 0) return "green lighten-4";
      if (total < 0) return "red lighten-4";
      else return "";
    },
    getTotalByPairs(items) {
      items.forEach(item => {
        const person = this.getPersonByName(item.name);
        if (!person.pair) {
          return;
        }
        const pairItem = items.find(
          it => it.name == this.getPersonById(person.pair).name
        );
        const sum = item.total + pairItem.total;
        [item.totalByPairs, pairItem.totalByPairs] =
          Math.abs(item.total) > Math.abs(pairItem.total) ? [sum, 0] : [0, sum];
      });
    },
    toggleDebtor(item){
      let editedPerson = {...this.getPersonByName(item.name)};
      editedPerson.isDebtor = item.isDebtor
      this.updatePerson(editedPerson)
    },
  }
};
</script>

<style>
.ttable {
  margin-bottom: 70px;
}
.debtor {
  display: block;
}
</style>
