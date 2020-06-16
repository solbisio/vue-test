<template>
  <div>
    <FormAssunto :assunto="{ id : 0 }" />
    <ul v-if="assuntos.length">
      <Assunto v-for="assunto in assuntos" :key="assunto.id" :assunto="assunto" />
    </ul>
  </div>
</template>

<script>
import Assunto from "./Assunto.vue";
import FormAssunto from "./FormAssunto.vue";

export default {
  data() {
    return {
      novoAssunto: null,
      nomeAssunto: null
    };
  },
  beforeCreate() {
    this.$store.dispatch("assuntos/updateTree");
  },
  computed: {
    assuntos() {
      return this.$store.getters["assuntos/get"];
    }
  },
  components: { Assunto, FormAssunto }
};
</script>

