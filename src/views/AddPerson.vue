<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-btn icon to="/">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Добавить человека</v-toolbar-title>
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

        <v-btn :disabled="!valid" color="success" @click="validate" block>Добавить</v-btn>
      </v-form>
    </v-content>
  </v-app>
</template>

<script>
import store from "../store.js";

export default {
  data() {
    return {
      valid: true,
      name: "",
      days: "1",
      pair: "без пары",
      nameRules: [
        v => !!v || "Имя обязательно",
        v => v.length > 2 || "Имя должно быть минимум из 3 символов",
        v => !store.persons.find(p => p.name == v) || "Это имя уже используется"
      ]
    };
  },
  computed: {
    pairItems: function() {
      return ["без пары", ...store.persons];
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const newPerson = {
          id: Math.random()
            .toString(16)
            .slice(2),
          name: this.name,
          days: parseInt(this.days),
          pair: this.pair == "без пары" ? undefined : this.pair
        };
        if (newPerson.pair) {
          store.persons.forEach(p => {
            if (p.id == newPerson.pair) p.pair = newPerson.id;
            if (p.pair == newPerson.pair) p.pair = undefined;
          });
        }
        store.persons.push(newPerson);
        this.$router.push("/");
      }
    }
  }
};
</script>