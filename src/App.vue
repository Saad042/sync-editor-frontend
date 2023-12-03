<template>
  <nav class="navbar bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Editor</router-link>
      <router-link to="/doc/create">Add Doc</router-link>
    </div>
  </nav>
  <router-view :key="route.name" />
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    return { route };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.spinner-center {
  align-items: center;
  justify-content: center;
}
</style>
