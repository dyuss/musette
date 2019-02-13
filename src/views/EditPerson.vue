<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-btn icon to="/">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Изменить человека</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
        <v-text-field label="Имя" v-model="name" :rules="nameRules" required></v-text-field>

        <p>Сколько дней?</p>
        <v-radio-group row v-model="days">
          <v-radio label="1" value="1"></v-radio>
          <v-radio label="2" value="2"></v-radio>
          <v-radio label="3" value="3"></v-radio>
          <v-radio label="4" value="4"></v-radio>
          <v-radio label="5" value="5"></v-radio>
        </v-radio-group>

        <v-select v-model="pair" :items="pairItems" item-text="name" item-value="id" label="Пара"></v-select>

        <v-container class="px-2">
          <v-layout row justify-space-around>
            <v-btn :disabled="!valid" color="success" @click="validate" block class="mr-2">Изменить</v-btn>
            <v-btn :disabled="!valid" color="error" @click.stop="showDeleteDialog = true" block>Удалить</v-btn>
          </v-layout>
        </v-container>
      </v-form>

      <DeleteDialog
        :visible.sync="showDeleteDialog"
        :action="deletePerson"
      >Вы действительно хотите удалить этого человека?</DeleteDialog>
    </v-content>
  </v-app>
</template>

<script>
import DeleteDialog from "@/components/DeleteDialog.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: { DeleteDialog },
  data() {
    return {
      valid: true,
      showDeleteDialog: false,
      id: null,
      name: "",
      days: "1",
      pair: "без пары",
      nameRules: [
        v => !!v || "Имя обязательно",
        v => v.length > 2 || "Имя должно быть минимум из 3 символов",
        this.isNameExistRule
      ]
    };
  },
  computed: {
    ...mapState(["persons"]),
    ...mapGetters(["getPersonById"]),
    pairItems: function() {
      return ["без пары", ...this.persons];
    }
  },
  created() {
    this.id = this.$route.params.id;
    const person = this.getPersonById(this.id);
    if (!person) {
      this.$router.push("/");
    }
    this.oldName = person.name;
    this.name = person.name;
    this.days = person.days.toString();
    this.pair = person.pair || "без пары";
  },
  methods: {
    isNameExistRule(v) {
      return (
        !this.persons.find(p => p.name == v && v != this.oldName) ||
        "Это имя уже используется"
      );
    },

    validate() {
      if (this.$refs.form.validate()) {
        const newPerson = {
          id: this.id,
          name: this.name,
          days: parseInt(this.days),
          pair: this.pair == "без пары" ? undefined : this.pair
        };
        this.persons.forEach((p, i) => {
          if (p.pair == newPerson.id || p.pair == newPerson.pair)
            p.pair = undefined;
          if (p.id == newPerson.pair) p.pair = newPerson.id;
          if (p.id == newPerson.id) this.persons[i] = newPerson;
        });
        this.$router.push("/");
      }
    },

    deletePerson() {
      this.persons = this.persons.filter(p => p.id != this.id);

      this.persons.forEach(p => {
        if (p.pair == this.id) p.pair = undefined;
      });

      this.purchases = this.purchases.map(p => {
        if (p.share.includes(this.id)) {
          p.share = p.share.filter(s => s != this.id);
        }
        return p;
      });

      this.purchases = this.purchases.filter(p => p.who != this.id);

      this.$router.push("/");
    }
  }
};
</script>