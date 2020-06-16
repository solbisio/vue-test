<template>
  <div>
    <b-form-input
      autocomplete="off"
      @keyup.enter="addBanca"
      placeholder="Cadastrar nova banca"
      autofocus
    />

    <b-list-group>
      <BancaItem v-for="(banca, index) in bancas" :key="index" :banca="banca" />
    </b-list-group>
  </div>
</template>

<script>
import BancaItem from "./BancaItem";
// import { mapActions } from 'vuex'

export default {
  name: "Banca",
  components: { BancaItem },
  data() {
    return {
    };
  },
  computed: {
    bancas() {
      return this.$store.getters["banca/get"];
    }
  },
  beforeCreate() {
      this.$store.dispatch("banca/set");
  },
  methods: {
    addBanca(e) {
      const text = e.target.value;
      this.$store.dispatch("banca/add", text);

      e.target.value = "";
    }
  }
};
</script>