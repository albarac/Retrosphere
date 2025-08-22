<template>
  <div class="home">
    <Post />
    <Post />
    <Post />
    <Post />
    <Post />
  </div>
</template>

<script>
import Post from '../components/Post.vue';
export default {
  components: {
    Post
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 100px;
  min-height: 100vh;
}
</style>