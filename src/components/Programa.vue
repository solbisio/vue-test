<template>
  <div>
    <b-form-input
      autocomplete="off"
      placeholder="Cadastrar novo programa"
      v-model="name"
      autofocus
    />

    <ejs-combobox
      id="combobox"
      :dataSource="orgao"
      :fields="fields"
      placeholder="Selecione o Orgão"
      v-model="orgao_id"
    />
    <ejs-combobox
      id="combobox"
      :dataSource="banca"
      :fields="fields"
      v-model="banca_id"
      placeholder="Selecione a Banca"
    />

    <button @click="addPrograma()">
      Salvar
      <b-icon-arrow-right-circle-fill />
    </button>

    <b-table striped small :items="programas" :fields="fieldsTable">
      <template v-slot:cell(assunto)="row">
        <b-button size="sm" @click="irDetalhes(row)" class="mr-2">Ver detalhes dos assuntos</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import Vue from "vue";
import { ComboBoxPlugin } from "@syncfusion/ej2-vue-dropdowns";
Vue.use(ComboBoxPlugin);

export default {
  name: "programa",
  data() {
    return {
      fields: {
        value: "id",
        text: "name"
      },
      fieldsTable: [
        { key: "name", label: "Programa", sortable: true },
        { key: "orgao", label: "Orgão", sortable: true },
        { key: "banca", label: "Banca", sortable: true },
        { key: "assunto", label: "Assunto" }
      ],
      name: null,
      banca_id: null,
      orgao_id: null
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
    programas() {
      var data = this.$store.getters["programa/get"];
      for (var i = 0; i < data.length; i += 1) {
        data[i].banca = this.banca.find(
          element => element.id == data[i].banca_id
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
    this.$store.dispatch("programa/set");
    this.$store.dispatch("orgao/set");
    this.$store.dispatch("banca/set");
  },
  methods: {
    irDetalhes(row) {
      this.$router.push({
        name: "programaDetalhe",
        params: {
          programaId: row.item.id,
          bancaId: row.item.banca_id,
          orgaoId: row.item.orgao_id
        }
      });
    },
    addPrograma() {
      // const text = e.target.value;
      this.$store.dispatch("programa/add", {
        name: this.name,
        banca_id: this.banca_id,
        orgao_id: this.orgao_id
      });

      this.name = "";
      this.banca_id = null;
      this.orgao_id = null;
    }
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>
