
import constantes from '../../config.js'
//  state
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
  set({ commit }) {
    fetch(constantes.API_URL + "banca").then(async response => {
      const data = await response.json();
      commit('set', data.records);
    });    
  },
  add({ commit }, name) {

    fetch(constantes.API_URL + "banca", {
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
  update( { commit }, banca) {
    fetch(constantes.API_URL + "banca/" + banca.id, {
      body: JSON.stringify(banca),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async () => {
      commit('update', banca);
    });
  },
  delete({ commit }, bancaId) {

    fetch(constantes.API_URL + "banca/" + bancaId, {
      method: "DELETE"
    }).then(async () => {
      commit('delete', bancaId);
    });
  }
}

// mutations
const mutations = {
  set(state, bancas) {
    state.items = bancas;
  },
  add(state, banca) {
    state.items.push(banca);
  },
  update(state, banca) {
    state.items.find(element => {
      return element.id == banca.id}).name = banca.name;
  },
  delete(state, bancaId) {
    const bancaDeleted = state.items.find(element => {
      return element.id == bancaId;
    })
    state.items.splice(state.items.indexOf(bancaDeleted), 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
