import Vue from 'vue'
import Vuex from 'vuex'
import assuntos from './modules/assuntos'
import banca from './modules/banca'
import orgao from './modules/orgao'
import questao from './modules/questao'
import programa from './modules/programa'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    assuntos,
    banca,
    orgao,
    questao,
    programa
  }
})
