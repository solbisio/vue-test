<template>
  <div>
    <b-form-input
      autocomplete="off"
      @keyup.enter="addOrgao"
      placeholder="Cadastrar nova orgao"
      autofocus
    />

    <b-list-group>
      <OrgaoItem v-for="(orgao, index) in orgaos" :key="index" :orgao="orgao" />
    </b-list-group>
  </div>
</template>

<script>
import OrgaoItem from "./OrgaoItem";
// import { mapActions } from 'vuex'

export default {
  name: "Orgao",
  components: { OrgaoItem },
  data() {
    return {
    };
  },
  computed: {
    orgaos() {
      return this.$store.getters["orgao/get"];
    }
  },
  beforeCreate() {
      this.$store.dispatch("orgao/set");
  },
  methods: {
    addOrgao(e) {
      const text = e.target.value;
      this.$store.dispatch("orgao/add", text);

      e.target.value = "";
    }
  }
};
</script>