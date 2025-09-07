<template>
  <div class="category">
    <h2 class="category-title">{{ capitalizedCategory }} Posts</h2>

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
  name: "CategoryPosts",
  components: { Post },
  data() {
    return {
      posts: []
    };
  },
  computed: {
    store() {
      return store;
    },
    category() {
      return this.$route.params.name; // pc, sony, etc.
    },
    filteredPosts() {
      return this.posts.filter(p => p.category === this.category);
    },
    capitalizedCategory() {
      return this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }
  },
  async mounted() {
    try {
      const res = await axios.get("http://localhost:9000/posts");
      this.posts = res.data;
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  },
  methods: {
    handlePostDeleted(postId) {
      this.posts = this.posts.filter(p => p._id !== postId);
    }
  }
};
</script>

<style scoped>
.category {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 100px;
  min-height: 100vh;
}

.category-title {
  font-family: "Pixelify Sans", sans-serif;
  margin-bottom: 20px;
}
</style>