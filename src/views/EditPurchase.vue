<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-btn icon to="/purchases">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Изменить покупку</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
        <v-text-field label="Название" v-model="title" :rules="titleRules" required></v-text-field>
        <v-text-field label="Сумма" v-model="cost" :rules="costRules" required mask="#####"></v-text-field>

        <v-select
          v-model="who"
          :items="personsItems"
          item-text="name"
          item-value="id"
          label="Кто платил"
        ></v-select>

        <v-select
          v-model="share"
          :items="shareItems"
          :menu-props="{ maxHeight: '400' }"
          label="Кто скидывается"
          item-text="name"
          item-value="id"
          multiple
          chips
          persistent-hint
          :rules="shareRules"
        ></v-select>

        <v-container class="px-2">
          <v-layout row justify-space-around>
            <v-btn :disabled="!valid" color="success" @click="validate" block class="mr-2">Изменить</v-btn>
            <v-btn :disabled="!valid" color="error" @click="deleteDialog = true" block>Удалить</v-btn>
          </v-layout>
        </v-container>
      </v-form>

      <v-dialog v-model="deleteDialog">
        <v-card>
          <v-card-text>Вы действительно хотите удалить эту покупку?</v-card-text>
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
      title: "",
      cost: "",
      who: "",
      share: [],
      titleRules: [
        v => !!v || "Название обязательно",
        v => v.length > 2 || "Название должно быть минимум из 3 символов",
        this.isTitleExistRule
      ],
      costRules: [
        v => !!v || "Сумма обязательна",
        v => parseInt(v) > 0 || "Некорректная сумма"
      ],
      shareRules: [v => v.length > 0 || "Кто-то должен скидываться за покупки"]
    };
  },
  created() {
    this.id = this.$route.params.id;
    const purchase = store.purchases.find(p => p.id == this.id);
    if (!purchase) {
      this.$router.push("/purchases");
    }
    this.oldTitle = purchase.title;
    this.title = purchase.title;
    this.cost = purchase.cost;
    this.who = purchase.who;
    this.share = purchase.share;
  },
  computed: {
    personsItems() {
      return store.persons;
    },
    shareItems() {
      return store.persons;
    }
  },
  methods: {
    isTitleExistRule(v) {
      return (
        !store.purchases.find(p => p.title == v && v != this.oldTitle) ||
        "Это название уже используется"
      );
    },

    validate() {
      if (this.$refs.form.validate()) {
        const editedPurchase = {
          id: this.id,
          title: this.title,
          cost: this.cost,
          who: this.who,
          share: this.share
        };

        const index = store.purchases.findIndex(p => p.id == editedPurchase.id);
        store.purchases[index] = editedPurchase;

        this.$router.push("/purchases");
      }
    },

    deletePerson() {
      store.purchases = store.purchases.filter(p => p.id != this.id);
      this.$router.push("/purchases");
    }
  }
};
</script>