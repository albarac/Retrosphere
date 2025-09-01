<template>
    <div class="details">
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
            </div>
        </div>

        <div style="border: solid 1px #0f380f; width: 90%;margin-top: 20px;margin-bottom: 20px;"></div>

        <div id="comments" class="overflow-auto">
            <Comment v-for="comment in filteredComments" :key="comment._id" :comment="comment"
                :canEdit="store.user && store.user._id === comment.userId" @commentUpdated="updateComment"
                @commentDeleted="removeComment" />
        </div>

        <div v-if="store.isLoggedIn" class="post_comment">
            <textarea v-model="newComment" rows="5" placeholder="Write a comment..."
                style="width: 100%; height: 150px; margin-top: 20px;font-size: 20px; border-radius: 6px; border: 2px solid #333; padding: 10px; box-sizing: border-box; font-family: 'Jersey 15', sans-serif;"></textarea>
            <button @click="submitComment"
                style="margin-top: 10px; padding: 10px 20px; background-color: #0f380f; color: white; border: none; border-radius: 6px; cursor: pointer; font-family: 'Pixelify Sans', sans-serif;">Post
                Comment</button>
        </div>

    </div>
</template>

<script>
import Comment from '../components/Comment.vue';
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'PostDetails',
    components: {
        Comment
    },
    data() {
        return {
            post: null,
            error: null,
            newComment: ''
        };
    },
    computed: {
        store() {
            return store;
        },
        filteredComments() {
            return this.post && this.post.comments
                ? this.post.comments.filter(c => c.userInfo)
                : [];
        },
        formattedDate() {
            return new Date(this.post.date).toLocaleDateString();
        }
    },
    methods: {
        async submitComment() {
            if (!this.newComment.trim()) return;

            try {
                const res = await axios.post(`http://localhost:9000/posts/${this.post._id}/comments`, {
                    userId: store.user._id,
                    content: this.newComment
                });

                this.post.comments.push(res.data.comment);
                this.newComment = '';
            } catch (err) {
                console.error("Failed to add comment:", err);
            }
        },
        updateComment(updated) {
            const index = this.post.comments.findIndex(c => c._id === updated.id);
            if (index !== -1) {
                this.post.comments[index].content = updated.content;
            }
        },
        removeComment(commentId) {
            const index = this.post.comments.findIndex(c => c._id === commentId);
            if (index !== -1) {
                this.post.comments.splice(index, 1);
            }
        }
    },
    async created() {
        const postId = this.$route.params.id;
        try {
            const res = await axios.get(`http://localhost:9000/posts/${postId}`);
            this.post = res.data;
        } catch (err) {
            console.error(err);
            this.error = 'Failed to fetch post';
        }
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