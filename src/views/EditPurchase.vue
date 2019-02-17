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
          :items="persons"
          item-text="name"
          item-value="id"
          label="Кто платил"
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

        <v-container class="px-2">
          <v-layout row justify-space-around>
            <v-btn :disabled="!valid" color="success" @click="validate" block class="mr-2">Изменить</v-btn>
            <v-btn :disabled="!valid" color="error" @click="showDeleteDialog = true" block>Удалить</v-btn>
          </v-layout>
        </v-container>
      </v-form>

      <DeleteDialog
        :visible.sync="showDeleteDialog"
        :action="onDeletePurchase"
      >Вы действительно хотите удалить эту покупку?</DeleteDialog>
    </v-content>
  </v-app>
</template>

<script>
import DeleteDialog from "@/components/DeleteDialog.vue";
import { mapMutations, mapGetters, mapState } from 'vuex';

export default {
  components: { DeleteDialog },
  data() {
    return {
      valid: true,
      showDeleteDialog: false,
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
    const purchase = this.getPurchaseById(this.id);
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
    ...mapState(["persons", "purchases"]),
    ...mapGetters(["getPurchaseById"])
  },
  methods: {
    ...mapMutations(["updatePurchase", "deletePurchase"]),
    isTitleExistRule(v) {
      return (
        !this.purchases.find(p => p.title == v && v != this.oldTitle) ||
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

        this.updatePurchase(editedPurchase);
        this.$router.push("/purchases");
      }
    },

    onDeletePurchase() {
      this.deletePurchase(this.id)
      this.$router.push("/purchases");
    }
  }
};
</script>