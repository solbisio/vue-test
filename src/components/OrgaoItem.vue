<template>
  <b-list-group-item :class="{ editing: editing }" button variant="secondary">
    <div class="view">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <label
              class="text-sm-left"
              v-show="!editing"
              v-text="orgao.name"
              @dblclick="editing = true"
            ></label>

            <b-form-input
              class="edit"
              v-show="editing"
              v-focus="editing"
              :value="orgao.name"
              @keyup.enter="doneEdit"
              @keyup.esc="cancelEdit"
              @blur="doneEdit"
            ></b-form-input>
          </b-col>
          <b-col>
            <div class="text-sm-right">
              <b-button-group>
                <button @click="editing = true">
                  <b-icon-pencil></b-icon-pencil>
                </button>
                <!-- <button @click="removeOrgao(orgao)">
                  <b-icon-trash></b-icon-trash>
                </button> -->
              </b-button-group>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-list-group-item>
</template>

<script>
export default {
  name: "orgaoItem",
  props: ["orgao"],
  data() {
    return {
      editing: false
    };
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus();
        });
      }
    }
  },
  methods: {
    removeOrgao(orgao) {
      this.$store.dispatch("orgao/delete", orgao.id);
    },
    update(e) {
      this.$store.dispatch("orgao/update", e);
      this.editAssunto = null;
    },
    doneEdit(e) {
      const value = e.target.value.trim();
      const { orgao } = this;
      if (!value) {
        this.removeorgao(orgao);
      } else if (this.editing) {
        this.update({
          id: orgao.id,
          name: value
        });
        this.editing = false;
      }
    },
    cancelEdit(e) {
      e.target.value = this.orgao.name;
      this.editing = false;
    }
  }
};
</script>