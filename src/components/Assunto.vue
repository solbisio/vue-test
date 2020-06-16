<template>
  <li>
    <FormAssunto :assunto="assunto" />
    <ul v-if="assunto.children" >
      <Assunto v-for="filho in assunto.children" :key="filho.id" :assunto="filho" />
    </ul>
  </li>
</template>

<script>
import FormAssunto from "./FormAssunto.vue";

export default {
  name: "Assunto",
  components: {
    FormAssunto
  },
  props: {
    assunto: Object
  },
  data() {
    return {
      editAssunto: null,
      novoAssunto: null,
      nomeAssunto: null,
    };
  },
  methods: {
    updateAssunto(assunto) {
      this.$store.dispatch("assuntos/update", assunto);
      this.editAssunto = null;
    },
    add(assuntoPai) {
      
      let assunto = Object.assign({}, assuntoPai)

      assunto.parent_id = assunto.id;
      assunto.id = null;
      assunto.name = this.nomeAssunto;
      delete(assunto.children);

      console.log(assunto);

      // assuntoPai.children.push(assunto);

      this.$store.dispatch("assuntos/add", assunto);
      this.novoAssunto = null;
      this.nomeAssunto = null;
    }
  }
};
</script>

