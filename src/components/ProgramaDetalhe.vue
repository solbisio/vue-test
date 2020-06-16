<template>
  <div>
    <h3>Detalhes do Programa</h3>
    <hr />

    <ul v-if="assuntos.length">
      <ProgramaDetalheItem
        v-for="assunto in assuntos"
        :key="assunto.id"
        :assunto="assunto"
        :orgaoId="$route.params.orgaoId"
        :bancaId="$route.params.bancaId"
      />
    </ul>
  </div>
</template>

<script>
import ProgramaDetalheItem from "./ProgramaDetalheItem.vue";

export default {
  name: "ProgramaDetalhe",
  props: {
    // programaId: Number
  },
  data() {
    return {
      //  programaId: programaId,
      //  programa: this.$store.getter("programa/get").find(element => {
      //   return element.id == programaId})
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
  components: { ProgramaDetalheItem }
};
</script>

