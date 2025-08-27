<template>
    <div class="details">
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
                    Please leave your feedback here. Please leave your feedback here. Please leave your feedback here.
                    Please
                    leave your feedback here. Please leave your feedback here. Please leave your feedback here. Please
                    leave your
                    feedback here. Please leave your feedback here. Please leave your feedback here. Please leave your
                    feedback
                    here. Please leave your feedback here.
                </div>
            </div>
        </div>

        <div style="border: solid 1px #0f380f; width: 90%;margin-top: 20px;margin-bottom: 20px;"></div>

        <div id="comments" class="overflow-auto">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>

        <div class="post_comment">
            <textarea rows="5" placeholder="Write a comment..."
                style="width: 100%; height: 150px; margin-top: 20px;font-size: 20px; border-radius: 6px; border: 2px solid #333; padding: 10px; box-sizing: border-box; font-family: 'Jersey 15', sans-serif;"></textarea>
            <button
                style="margin-top: 10px; padding: 10px 20px; background-color: #0f380f; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: 'Pixelify Sans', sans-serif;">Post
                Comment</button>
        </div>

    </div>
</template>

<script>
import Comment from '../components/Comment.vue';
export default {
    name: 'PostDetails',
    components: {
        Comment
    }
}
</script>

<style scoped>
.details {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    min-height: 100vh;
}

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

#comments {
    width: 100%;
    max-height: 400px;
    border-radius: 6px;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    font-family: "Jersey 15", sans-serif;
}

.post_comment {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "Jersey 15", sans-serif;
}
</style>