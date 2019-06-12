<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-toolbar-title class="white--text">Люди</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="persons.length > 0" icon @click.stop="showDeleteDialog = true">
        <v-icon>clear</v-icon>
      </v-btn>
      <v-btn icon to="/add-person">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <div class="no-persons-text" v-if="persons.length == 0">Никого нет. Добавьте людей.</div>
      <v-list two-line class="mb-5">
        <template v-for="(p, i) in persons">
          <v-list-tile :key="p.id" ripple @click="edit(p.id)">
            <v-list-tile-content>
              <v-list-tile-title>{{ p.name }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span v-if="p.days == 1">1 день</span>
                <span v-else-if="p.days == 5">5 дней</span>
                <span v-else>{{p.days}} дня</span>
                <span v-if="p.pair"> (пара: {{ getPersonById(p.pair).name }})</span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i + 1 < persons.length" :key="i"></v-divider>
        </template>
      </v-list>
      <BottomNav current="persons"/>

      <DeleteDialog
        :visible.sync="showDeleteDialog"
        :action="onClearAll"
      >Вы действительно хотите удалить все данные?</DeleteDialog>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import BottomNav from "@/components/BottomNav.vue";
import DeleteDialog from "@/components/DeleteDialog.vue";

export default {
  components: {
    BottomNav,
    DeleteDialog
  },
  data() {
    return {
      showDeleteDialog: false,
    }
  },
  computed: {
    ...mapState(["persons"]),
    ...mapGetters(["getPersonById"])
  },
  methods: {
    ...mapMutations(["clearAll"]),
    edit: function(id) {
      this.$router.push("/edit-person/" + id);
    },
    onClearAll: function() {
      this.clearAll();
      this.showDeleteDialog = false;
    }
  }
};
</script>

<style>
.no-persons-text {
  text-align: center;
  padding-top: 10px; 
}
</style>

