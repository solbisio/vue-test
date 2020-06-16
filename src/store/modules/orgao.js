import constantes from '../../config.js'
// state
const state = () => ({
  items: []
})

// getters
const getters = {
  get(state) {
    return state.items;
  }
}

// actions
const actions = {
  set({ commit },) {
    fetch(constantes.API_URL + "orgao").then(async response => {
      const data = await response.json();
      commit('set', data.records);
    });
  },
  add({ commit }, name) {

    fetch(constantes.API_URL + "orgao", {
      body: JSON.stringify({ name }),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      const data = await response.json();
      commit('add', { name, id: data });
    });
  },
  update( { commit }, orgao) {
    fetch(constantes.API_URL + "orgao/" + orgao.id, {
      body: JSON.stringify(orgao),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async () => {
      commit('update', orgao);
    });
  },
  delete({ commit }, orgaoId) {

    fetch(constantes.API_URL + "orgao/" + orgaoId, {
      method: "DELETE"
    }).then(async () => {
      commit('delete', orgaoId);
    });
  }
}

// mutations
const mutations = {
  set(state, orgaos) {
    state.items = orgaos;
  },
  add(state, orgao) {
    state.items.push(orgao);
  },
  update(state, orgao) {
    state.items.find(element => {
      return element.id == orgao.id}).name = orgao.name;
  },
  delete(state, orgaoId) {
    const orgaoDeleted = state.items.find(element => {
      return element.id == orgaoId;
    })
    state.items.splice(state.items.indexOf(orgaoDeleted), 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
