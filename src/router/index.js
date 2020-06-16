import Vue from 'vue';
import Router from 'vue-router';
// import PageNotFound from '@/views/page-not-found';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/assuntos',
      name: 'assuntos',
      component: () =>
        import('../components/Assuntos.vue'),
    },
    {
      path: '/banca',
      name: 'banca',
      component: () =>
        import('../components/Banca.vue'),
    },
    {
      path: '/orgao',
      name: 'orgao',
      component: () =>
        import('../components/Orgao.vue'),
    },
    {
      path: '/questao',
      name: 'questao',
      component: () =>
        import('../components/Questao.vue'),
    },
    {
      path: '/programa',
      name: 'programa',
      component: () =>
        import('../components/Programa.vue'),
    },
    {
      path: '/programa-detalhe/:programaId/:bancaId/:orgaoId',
      name: 'programaDetalhe',
      component: () =>
        import('../components/ProgramaDetalhe.vue'),
    },
    // {
    //   path: '*',
    //   component: PageNotFound,
    // },
  ],
});