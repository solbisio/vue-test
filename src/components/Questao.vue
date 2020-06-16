<template>
  <div>
    <b-form-input autocomplete="off" placeholder="Cadastrar nova Questão" v-model="name" autofocus />

    <ejs-combobox
      id="combobox"
      :dataSource="orgao"
      :fields="fields"
      placeholder="Selecione o Orgão"
      v-model="orgao_id"
    />
    <ejs-combobox
      id="combobox"
      :dataSource="assunto"
      :fields="fields"
      v-model="assunto_id"
      placeholder="Selecione o Assunto"
    />
    <ejs-combobox
      id="combobox"
      :dataSource="banca"
      :fields="fields"
      v-model="banca_id"
      placeholder="Selecione a Banca"
    />

    <button @click="addQuestao()">
      Salvar
      <b-icon-arrow-right-circle-fill />
    </button>

    <b-table
      id="table-transition"
      striped
      small
      :items="questoes"
      :fields="fieldsTable"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(ComboBoxPlugin);

export default {
  name: "questao",
  data() {
    return {
      fields: {
        value: "id",
        text: "name"
      },
      fieldsTable: [
        { key: "name", label: "Questão" , sortable: true },
        { key: "assunto", label: "Assunto" , sortable: true },
        { key: "orgao", label: "Orgão", sortable: true  },
        { key: "banca", label: "Banca" , sortable: true }
      ],
      name: null,
      banca_id: null,
      orgao_id: null,
      assunto_id: null
    };
  },
  computed: {
    orgao() {
      return this.$store.getters["orgao/get"];
    },
    banca() {
      return this.$store.getters["banca/get"];
    },
    assunto() {
      return this.$store.getters["assuntos/getFlat"];
    },
    questoes() {
      var data = this.$store.getters["questao/get"];
      for (var i = 0; i < data.length; i += 1) {
        data[i].banca = this.banca.find(
          element => element.id == data[i].banca_id
        ).name;
        data[i].assunto = this.assunto.find(
          element => element.id == data[i].assunto_id
        ).name;
        data[i].orgao = this.orgao.find(
          element => element.id == data[i].orgao_id
        ).name;
      }
      return data;
    }
  },
  beforeCreate() {
    this.$store.dispatch("assuntos/updateTree");
    this.$store.dispatch("questao/set");
    this.$store.dispatch("orgao/set");
    this.$store.dispatch("banca/set");
  },
  methods: {
    addQuestao() {
      // const text = e.target.value;
      this.$store.dispatch("questao/add", {
        name: this.name,
        banca_id: this.banca_id,
        orgao_id: this.orgao_id,
        assunto_id: this.assunto_id
      });

      this.name = "";
      this.banca_id = null;
      this.orgao_id = null;
      this.assunto_id = null;
    }
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>
