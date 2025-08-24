<template>

  <div>
    <Navbar  v-if="route.path !== '/signup'" />
    <router-view />
  </div>

</template>

<script>
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar
  },
    setup() {
    const route = useRoute();
    return { route };
  }
}
</script>

<style scoped>

</style>