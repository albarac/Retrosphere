<template>
  <div class="post" @click="goToDetails">
    <div class="post-left">
      <img :src="`/avatars/${post.userInfo.image}`" alt="Avatar" class="avatar">
      <div class="username">{{ post.userInfo.username }}</div>
    </div>

    <div class="post-right">
      <div class="post-header">
        <h6>{{ post.title }}</h6>
        <h7 id="posted_date" style="font-style: italic;">{{ formattedDate }}</h7>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div class="buttons" v-if="store.user && store.user._id === post.userId">
        <i @click.stop="goEditPost" id="edit" class="bi bi-pen-fill"></i>
        <i @click.stop="showDeleteModal = true" id="delete" class="bi bi-trash-fill"></i>
      </div>
    </div>


    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h5>Are you sure?</h5>
        <p>This action will permanently delete the post.</p>
        <div class="modal-buttons" style="display: flex; justify-content: center; gap: 10px;">
          <button class="btn btn-danger" @click.stop="confirmDelete">Delete</button>
          <button class="btn btn-secondary" @click.stop="showDeleteModal = false">Cancel</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { store } from '../store';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
  name: "Post",
  props: {
    post: { type: Object, required: true }
  },
  data() {
    return {
      showDeleteModal: false,
      deleting: false
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.post.date).toLocaleDateString();
    },
    store() {
      return store;
    }
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: 'PostDetails', params: { id: this.post._id } });
    },
    goEditPost() {
      this.$router.push({ name: 'EditPost', params: { id: this.post._id } });
    },
    async confirmDelete() {
      if (this.deleting) return;
      this.deleting = true;
      try {
        const res = await axios.delete(`http://localhost:9000/posts/${this.post._id}`);
        if (res.data?.success) {
          this.$emit("postDeleted", this.post._id);
        }
      } catch (err) {
        console.error("Failed to delete post:", err);
      } finally {
        this.deleting = false;
        this.showDeleteModal = false;
      }
    }
  }
};
</script>

<style scoped>
.post {
  display: flex;
  background: #adadb1;
  border: 3px solid #333;
  border-radius: 6px;
  margin: 10px 0;
  color: #000000;
  font-family: Arial, sans-serif;
  width: 100%;
  transition: 1s;
}

.post:hover {
  cursor: pointer;
  background: #d1d1d5;
}

.post-left {
  width: 180px;
  padding: 15px;
  text-align: center;
  border-right: 1px solid #333;
  font-family: "Pixelify Sans", sans-serif;
}

.avatar {
  width: 70px;
  height: 70px;

  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #0f380f;
}

.role {
  font-size: 14px;
  color: #ccc;
}

.post-right {
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 20px;
  color: #000000;
  border-bottom: 1px solid #333;
  padding: 5px;
  font-family: "Pixelify Sans", sans-serif;
}

.post-content {
  font-size: 20px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: justify;
  font-family: "Jersey 15", sans-serif;
}

#delete {
  font-size: 20px;
  color: #d9534f;
  cursor: pointer;
}

#edit {
  font-size: 20px;
  color: #095065;
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;
  padding-right: 10px;
}


.modal-content {
  background-color: #adadb1;
  color: black;
  padding: 15px;
  font-family: "Pixelify Sans", sans-serif;
}
@media screen and (max-width: 600px) {
  #posted_date {
    display: none;
  }
}
</style>