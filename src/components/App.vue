<template>
  <div style="border:10px">
    <h1>Vuejs Slim restful API integration</h1>
    <hr>
    <NavBar />
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'

export default {
  components: { NavBar }
}
</script>



