
import constantes from '../../config.js'
// função para transformar array flat em arvore utilizando parent_id como indice
async function toTree(data) {
  var map = {},
    node,
    roots = [],
    i;
  for (i = 0; i < data.length; i += 1) {
    map[data[i].id] = i;
    data[i].children = [];
  }
  for (i = 0; i < data.length; i += 1) {
    node = data[i];
    if (node.parent_id !== 0) {
      data[map[node.parent_id]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}
// encontrar filhos na arvore
async function findNode(id, currentNode) {
  var i,
    currentChild,
    result;

  if (id == currentNode.id) {
    return currentNode;
  } else {

    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    if (currentNode.children) {
      for (i = 0; i < currentNode.children.length; i += 1) {
        currentChild = currentNode.children[i];
  
        // Search in the current child
        result = findNode(id, currentChild);
  
        // Return the result if the node has been found
        if (result !== false) {
          return result;
        }
      }
    }

    // The node has not been found and we have no more options
    return false;
  }
}


// initial state
const state = () => ({
  items: [],
  itemsFlat: []
})

// getters
const getters = {
  get(state) {
    return state.items;
  },
  getFlat(state) {
    return state.itemsFlat;
  }
}

// actions
const actions = {
  updateTree({ commit }) {
    fetch(constantes.API_URL + "assuntos").then(async response => {
      const data = await response.json();
      commit('setFlat', data.records);
      const arvore = await toTree(data.records);
      commit('updateTree', arvore);
      return arvore;
    });
  },
  add({ commit }, assunto) {

    fetch(constantes.API_URL + "assuntos/", {
      body: JSON.stringify(assunto),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (response) => {
      const data = await response.json();
      assunto.id = data;
      if (assunto.parent_id != 0) {
        assuntoPai = state.items;
      } else {
        var assuntoPai = await findNode(assunto.parent_id, state.items);
      }
      commit('add', assunto, assuntoPai);
    });
  },
  update({ commit }, assunto) {

    fetch(constantes.API_URL + "assuntos/" + assunto.id, {
      body: JSON.stringify(assunto),
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async () => {
      commit('update', assunto);
    });
  },
  delete() {
  }
}

// mutations
const mutations = {
  add(state, assunto, assuntoPai) {
    assuntoPai.push(assunto);
    state.itemsFlat.push(assunto);
  },
  setFlat(state, assuntosLista) {
    state.itemsFlat = assuntosLista;
  },
  updateTree(state, lista) {
    state.items = lista;
  },
  update(state, assunto) {
    state.items.find(element => {
      return element.id == assunto.id
    }).name = assunto.name;
  },
  delete(state, assuntoId) {
    const assunto = state.items.find(assunto => {
      return assunto.id == assuntoId;
    })
    state.items.splite(state.items.indexOf(assunto), 1);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
