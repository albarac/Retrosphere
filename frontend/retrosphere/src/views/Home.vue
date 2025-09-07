<template>
  <div class="home">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search posts..."
      class="search-bar"
    />

    <Post
      v-for="post in filteredPosts"
      :key="post._id"
      :post="post"
      @postDeleted="handlePostDeleted"
    />
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  components: { Post },
  data() {
    return {
      posts: [],
      searchQuery: '',
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
  computed: {
    store() {
      return store;
    },
    filteredPosts() {
      if (!this.searchQuery.trim()) return this.posts;

      const query = this.searchQuery.toLowerCase();
      return this.posts.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    handlePostDeleted(postId) {
      this.posts = this.posts.filter(p => p._id !== postId);
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 100px;
  min-height: 100vh;
}

.search-bar {
  width: 80%;
  padding: 10px 15px;
  font-size: 18px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 2px solid #333;
  font-family: 'Pixelify Sans', sans-serif;
}
</style>