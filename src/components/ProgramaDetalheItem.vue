<template>
  <div>
    {{assunto.name}} - 
[
    {{
    questao.filter(element => element.assunto_id === assunto.id).length
    }} Questões ]
    <ul v-if="assunto.children">
      <ProgramaDetalheItem
        v-for="filho in assunto.children"
        :key="filho.id"
        :assunto="filho"
        :orgaoId="$route.params.orgaoId"
        :bancaId="$route.params.bancaId"
      />
    </ul>
  </div>
</template>

<script>
import ProgramaDetalheItem from "./ProgramaDetalheItem.vue";

export default {
  name: "ProgramaDetalheItem",
  props: {
    assunto: Object,
    bancaId: Number,
    orgaoId: Number
  },
  data() {
    return {
      questao: this.$store.getters["questao/get"]
        .filter(element => element.banca_id === 1)
        .filter(element => element.orgao_id === 1)
      // programaId: programaId
    };
  },
  beforeCreate() {
    // this.$store.dispatch("assuntos/updateTree");
  },
  computed: {
    // assuntos() {
    //   return this.$store.getters["assuntos/get"];
    // }
  },
  components: { ProgramaDetalheItem }
};
</script>

