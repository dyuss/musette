<template>
  <v-app>
    <v-toolbar app dark color="teal">
      <v-btn icon to="/purchases">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Добавить покупку</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-form ref="form" v-model="valid" lazy-validation class="pa-3">
        <v-text-field label="Название" v-model="title" :rules="titleRules" required></v-text-field>
        <v-text-field label="Сумма" v-model="cost" :rules="costRules" required mask="#####"></v-text-field>

        <v-select
          v-model="who"
          :items="persons"
          item-text="name"
          item-value="id"
          label="Кто платил"
          :rules="whoRules"
        ></v-select>

        <v-select
          v-model="share"
          :items="persons"
          :menu-props="{ maxHeight: '400' }"
          label="Кто скидывается"
          item-text="name"
          item-value="id"
          multiple
          chips
          persistent-hint
          :rules="shareRules"
        ></v-select>

        <v-btn :disabled="!valid" color="success" @click="validate" block>Добавить</v-btn>
      </v-form>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      title: "",
      cost: "",
      who: "",
      share: [],
      titleRules: [
        v => !!v || "Название обязательно",
        v => v.length > 2 || "Название должно быть минимум из 3 символов",
        v =>
          !this.purchases.find(p => p.title == v) ||
          "Это название уже используется"
      ],
      costRules: [
        v => !!v || "Сумма обязательна",
        v => parseInt(v) > 0 || "Некорректная сумма"
      ],
      whoRules: [
        v => !!v || "Нужно кого-то выбрать",
      ],
      shareRules: [v => v.length > 0 || "Кто-то должен скидываться за покупки"]
    };
  },
  created() {
    this.share = this.persons.map(p => p.id);
  },
  computed: {
    ...mapState(["persons", "purchases"]),
  },
  methods: {
    ...mapMutations(["createPurchase"]),
    validate() {
      if (this.$refs.form.validate()) {
        const newPurchase = {
          id: Math.random()
            .toString(16)
            .slice(2),
          title: this.title,
          cost: parseInt(this.cost),
          who: this.who,
          share: this.share
        };
       
        this.createPurchase(newPurchase);
        this.$router.push("/purchases");
      }
    }
  }
};
</script>