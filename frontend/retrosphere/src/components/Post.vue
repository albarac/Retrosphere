<template>
        <div class="post">
      <div class="post-left">
        <img src="https://pbs.twimg.com/profile_images/794107415876747264/g5fWe6Oh_400x400.jpg" alt="Avatar"
          class="avatar">
        <div class="username">JTH-QA</div>
      </div>

      <div class="post-right">
        <div class="post-header">
          <h6>Return of the king!</h6>
          <h7 style="font-style: italic;">21/08/2025</h7>
        </div>
        <div class="post-content">
          Please leave your feedback here. Please leave your feedback here. Please leave your feedback here. Please
          leave your feedback here. Please leave your feedback here. Please leave your feedback here. Please leave your
          feedback here. Please leave your feedback here. Please leave your feedback here. Please leave your feedback
          here. Please leave your feedback here.
        </div>
        <div class="buttons">
          <i id="edit" class="bi bi-pen-fill"></i>
          <i id="delete" class="bi bi-trash-fill"></i>
        </div>
      </div>
    </div>
</template>

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
}

.post-left {
  width: 180px;
  padding: 15px;
  text-align: center;
  border-right: 1px solid #333;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
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
  font-size: 14px;
  color: #000000;
  border-bottom: 1px solid #333;
  padding: 5px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: justify;
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