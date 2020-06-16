
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
    fetch(constantes.API_URL + "questao").then(async response => {
      const data = await response.json();
      commit('set', data.records);
    });
  },
  add({ commit }, questaoObj) {
    fetch(constantes.API_URL + "questao", {
      body: JSON.stringify(questaoObj),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      const data = await response.json();
      commit('add',{...questaoObj, ...{id: data} });
    });
  },
  update( { commit }, questao) {
    fetch(constantes.API_URL + "questao/" + questao.id, {
      body: JSON.stringify(questao),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async () => {
      commit('update', questao);
    });
  },
  delete({ commit }, questaoId) {

    fetch(constantes.API_URL + "questao/" + questaoId, {
      method: "DELETE"
    }).then(async () => {
      commit('delete', questaoId);
    });
  }
}

// mutations
const mutations = {
  set(state, questoes) {
    state.items = questoes;
  },
  add(state, questao) {
    state.items.push(questao);
  },
  update(state, questao) {
    state.items.find(element => {
      return element.id == questao.id}).name = questao.name;
  },
  delete(state, questaoId) {
    const questaoDeleted = state.items.find(element => {
      return element.id == questaoId;
    })
    state.items.splice(state.items.indexOf(questaoDeleted), 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
