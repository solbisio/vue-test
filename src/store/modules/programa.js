
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
  set({ commit }) {
    fetch(constantes.API_URL + "programa").then(async response => {
      const data = await response.json();
      commit('set', data.records);
    });
  },
  add({ commit }, programaObj) {
    fetch(constantes.API_URL + "programa", {
      body: JSON.stringify(programaObj),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      const data = await response.json();
      commit('add',{...programaObj, ...{id: data} });
    });
  },
  update( { commit }, programa) {
    fetch(constantes.API_URL + "programa/" + programa.id, {
      body: JSON.stringify(programa),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async () => {
      commit('update', programa);
    });
  },
  delete({ commit }, programaId) {

    fetch(constantes.API_URL + "programa/" + programaId, {
      method: "DELETE"
    }).then(async () => {
      commit('delete', programaId);
    });
  }
}

// mutations
const mutations = {
  set(state, programas) {
    state.items = programas;
  },
  add(state, programa) {
    state.items.push(programa);
  },
  update(state, programa) {
    state.items.find(element => {
      return element.id == programa.id}).name = programa.name;
  },
  delete(state, programaId) {
    const programaDeleted = state.items.find(element => {
      return element.id == programaId;
    })
    state.items.splice(state.items.indexOf(programaDeleted), 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
