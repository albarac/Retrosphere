<template>
  <div class="home">
    <Post v-for="post in posts" :key="post._id" :post="post" />
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import axios from 'axios';
import { store } from '../store';
export default {
  components: {
    Post
  },
  data() {
    return {
      posts: []
    };
  },
  async mounted() {
    try {
      const res = await axios.get('http://localhost:9000/posts');
      this.posts = res.data;
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  },
  methods: {
  },
  computed: {
    store() {
      return store;
    }
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