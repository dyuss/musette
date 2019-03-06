<template>
  <v-bottom-nav :active="current" :value="true" fixed>
    <v-btn color="teal" flat value="persons" to="/">
      <span>Люди</span>
      <v-icon>group</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="purchases" to="/purchases">
      <span>Покупки</span>
      <v-icon>shopping_cart</v-icon>
    </v-btn>

    <v-btn color="teal" flat value="table" to="/table">
      <span>Таблица</span>
      <v-icon>insert_chart</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
  export default {
    props: ['current'],
  }
</script>