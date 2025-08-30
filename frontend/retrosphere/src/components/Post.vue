<template>
  <div class="post">
    <div class="post-left">
      <img :src="`/avatars/${post.userInfo.image}`" alt="Avatar" class="avatar">
      <div class="username">{{ post.userInfo.username }}</div>
    </div>

    <div class="post-right">
      <div class="post-header">
        <h6>{{ post.title }}</h6>
        <h7 style="font-style: italic;">{{ formattedDate }}</h7>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
      <div class="buttons" v-if="store.user && store.user._id === post.userId">
        <i id="edit" class="bi bi-pen-fill"></i>
        <i id="delete" class="bi bi-trash-fill"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store';
export default {
  name: "Post",
  props: {
    post: { type: Object, required: true }
  },
  computed: {
    formattedDate() {
      return new Date(this.post.date).toLocaleDateString();
    },
      store() {
      return store; // access reactive store in template
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
</style>