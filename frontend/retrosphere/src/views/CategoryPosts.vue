<template>
  <div class="category">
    <h2 class="category-title">{{ capitalizedCategory }} Posts</h2>

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
  name: "CategoryPosts",
  components: { Post },
  data() {
    return {
      posts: [],
      searchQuery: ''
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
      const categoryFiltered = this.posts.filter(p => p.category === this.category);

      if (!this.searchQuery.trim()) return categoryFiltered;

      const query = this.searchQuery.toLowerCase();
      return categoryFiltered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
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