<template>
    <div class="comment">
        <div class="comment-left">
            <img src="https://avatarfiles.alphacoders.com/364/364556.jpg" alt="Avatar"
                class="avatar">
            <div class="username">JTH-QA</div>
        </div>

        <div class="comment-right">
            <div class="comment-header">
                <h7 style="font-style: italic;">21/08/2025</h7>
            </div>
            <div class="comment-content">
                Please leave your feedback here. Please leave your feedback here. Please leave your feedback here.
                Please
                leave your feedback here. Please leave your feedback here. Please leave your feedback here. Please leave
                your
                feedback here. Please leave your feedback here. Please leave your feedback here. Please leave your
                feedback
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
.comment {
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

.comment:hover {
    cursor: pointer;
    background: #d1d1d5;
}

.comment-left {
    width: 180px;
    padding: 15px;
    text-align: center;
    border-right: 1px solid #333;
    font-family: "Pixelify Sans", sans-serif;
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

.comment-right {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 20px;
    color: #000000;
    border-bottom: 1px solid #333;
    padding: 5px;
    font-family: "Pixelify Sans", sans-serif;
}

.comment-content {
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