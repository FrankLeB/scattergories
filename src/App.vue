<template>
  <div id="app">
    <div class="container">
      <app-scatter-grid></app-scatter-grid>
    </div>
  </div>
</template>

<script>
import ScatterGrid from "./views/ScatterGrid.vue";

export default {
  components: {
    appScatterGrid: ScatterGrid
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
