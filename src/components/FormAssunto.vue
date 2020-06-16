<template>
  <div>
    <div v-if="editAssunto === assunto.id">
      <input v-on:keyup.13="updateAssunto(assunto)" v-model="assunto.name" />
      <button v-on:click="updateAssunto(assunto)">
        <b-icon-check>save</b-icon-check>
      </button>
    </div>
    <div v-else-if="novoAssunto === assunto.id">
      <input v-on:keyup.13="add(assunto)" placeholder="Novo Assunto" v-model="nomeAssunto" />
      <button v-on:click="add(assunto)">
        <b-icon-check>save</b-icon-check>
      </button>
    </div>
    <div v-else-if="assunto.id === 0" v-on:click="novoAssunto = 0; ">
      <button class="btn btn-default">
        <b-icon-plus>Novo</b-icon-plus>Adicionar Assunto na Raiz
      </button>
    </div>
    <div v-else>
      {{ assunto.name }}
      <button
        v-on:click="editAssunto = assunto.id"
        title="Adicionar filho neste assunto"
        class="btn btn-default"
      >
        <b-icon-pencil>edit</b-icon-pencil>
      </button>

      <button class="btn btn-default" v-on:click="novoAssunto = assunto.id">
        <b-icon-plus>Novo</b-icon-plus>
      </button>
    </div>
  </div>
</template>


<script>
export default {
  name: "FormAssunto",
  props: {
    assunto: Object
  },
  data() {
    return {
      editAssunto: null,
      novoAssunto: null,
      nomeAssunto: null
    };
  },
  methods: {
    updateAssunto(assunto) {
      this.$store.dispatch("assuntos/update", assunto);
      this.editAssunto = null;
    },
    add(assuntoPai) {
      this.$store.dispatch("assuntos/add", {
        parent_id: assuntoPai.id,
        id: null,
        name: this.nomeAssunto
      });
      
      this.novoAssunto = null;
      this.nomeAssunto = null;
    }
  }
};
</script>
    