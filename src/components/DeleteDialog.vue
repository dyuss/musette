<template>
  <v-dialog v-model="visible" persistent>
    <v-card>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info darken-1" flat="flat" @click="close">Нет</v-btn>
        <v-btn color="error darken-1" flat="flat" @click="action">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["visible", "action"],
  methods: {
    close() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
