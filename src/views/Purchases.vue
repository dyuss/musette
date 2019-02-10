<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-title class="white--text">Покупки</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/add-purchase">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-list two-line class="mb-5">
        <template v-for="(p, i) in purchases">
          <v-list-tile :key="p.id" ripple @click="edit(p.id)">
            <v-list-tile-content>
              <v-list-tile-title>{{ p.title }}</v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">{{ humanWho(p.who) }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>{{ humanShare(p.share) }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>
                <v-chip color="secondary" outline>{{ p.cost }}р.</v-chip>
              </v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="i + 1 < purchases.length" :key="i"></v-divider>
        </template>
      </v-list>
      <BottomNav current="purchases"/>
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
      purchases: store.purchases
    };
  },
  methods: {
    humanWho(who) {
      return store.persons.find(p => p.id == who).name;
    },
    humanShare(share) {
      return share.map(s => store.persons.find(p => p.id == s).name).join(", ");
    },
    edit: function(id) {
      this.$router.push("/edit-purchase/" + id);
    }
  }
};
</script>
