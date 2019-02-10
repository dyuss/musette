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
            <v-btn :disabled="!valid" color="error" @click="deleteDialog = true" block>Удалить</v-btn>
          </v-layout>
        </v-container>
      </v-form>

      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-text>Вы действительно хотите удалить этого человека?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info darken-1" flat="flat" @click="deleteDialog = false">Нет</v-btn>
            <v-btn color="error darken-1" flat="flat" @click="deletePerson">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script>
import store from "../store.js";

export default {
  data() {
    return {
      valid: true,
      deleteDialog: false,
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
  created() {
    this.id = this.$route.params.id;
    const person = store.persons.find(p => p.id == this.id);
    if (!person) {
      this.$router.push("/");
    }
    this.oldName = person.name;
    this.name = person.name;
    this.days = person.days.toString();
    this.pair = person.pair || "без пары";
  },
  computed: {
    pairItems: function() {
      return ["без пары", ...store.persons];
    }
  },
  methods: {
    isNameExistRule(v) {
      return (
        !store.persons.find(p => p.name == v && v != this.oldName) ||
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
        store.persons.forEach((p, i) => {
          if (p.pair == newPerson.id || p.pair == newPerson.pair)
            p.pair = undefined;
          if (p.id == newPerson.pair) p.pair = newPerson.id;
          if (p.id == newPerson.id) store.persons[i] = newPerson;
        });
        this.$router.push("/");
      }
    },

    deletePerson() {
      store.persons = store.persons.filter(p => p.id != this.id);

      store.persons.forEach(p => {
        if (p.pair == this.id) p.pair = undefined;
      });

      store.purchases = store.purchases.map(p => {
        if (p.share.includes(this.id)) {
          p.share = p.share.filter(s => s != this.id);
        }
        return p;
      });

      store.purchases = store.purchases.filter(p => p.who != this.id);

      this.$router.push("/");
    }
  }
};
</script>