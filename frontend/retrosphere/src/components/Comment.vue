<template>
    <div class="comment">
        <div class="comment-left">
            <img :src="`/avatars/${comment.userInfo.image}`" alt="Avatar" class="avatar">
            <div class="username">{{ comment.userInfo.username }}</div>
        </div>

        <div class="comment-right">
            <div class="comment-header">
                <h7 style="font-style: italic;">{{ formattedDate }}</h7>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
            <div class="buttons" v-if="canEdit">
                <i id="edit" class="bi bi-pen-fill"></i>
                <i id="delete" class="bi bi-trash-fill"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Comment",
    props: {
        comment: { type: Object, required: true },
        canEdit: { type: Boolean, default: false }
    },
    computed: {
        formattedDate() {
            return new Date(this.comment.date).toLocaleDateString();
        }
    }
};
</script>

<style scoped>
.comment {
    display: flex;
    background: #adadb1;
    border: 3px solid #333;
    border-radius: 6px;
    margin: 10px 0;
    width: 100%;
    transition: 1s;
}

.comment-left {
    width: 180px;
    padding: 15px;
    text-align: center;
    border-right: 1px solid #333;
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

.comment-right {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 20px;
    border-bottom: 1px solid #333;
    padding: 5px;
}

.comment-content {
    font-size: 20px;
    line-height: 1.5;
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