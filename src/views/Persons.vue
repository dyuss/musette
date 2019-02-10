<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-title class="white--text">Люди</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/add-person">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-list two-line class="mb-5">
        <template v-for="(p, i) in persons">
          <v-list-tile :key="p.id" ripple @click="edit(p.id)">
            <v-list-tile-content>
              <v-list-tile-title>{{ p.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ humanDays(p.days) }}{{ humanPair(p.pair) }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i + 1 < persons.length" :key="i"></v-divider>
        </template>
      </v-list>
      <BottomNav current="persons"/>
    </v-content>
  </v-app>
</template>

<script>
import store from "../store.js";
import BottomNav from "@/components/BottomNav.vue";

export default {
  components: {
    BottomNav
  },
  data() {
    return {
      persons: store.persons
    };
  },
  methods: {
    humanDays: function(d) {
      if (d == 1) return "1 день";
      else if (d == 5) return "5 дней";
      else return d + " дня";
    },
    humanPair: function(pair) {
      return pair ? ` (пара: ${this.getPersonNameById(pair)})` : "";
    },
    getPersonNameById: function(id) {
      return this.persons.find(p => p.id == id).name;
    },
    edit: function(id) {
      this.$router.push("/edit-person/" + id);
    }
  }
};
</script>
