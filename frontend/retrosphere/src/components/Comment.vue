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
            <div v-if="!editing" class="comment-content">{{ comment.content }}</div>
            <textarea id="edit_textarea" v-else v-model="editedContent" rows="3" class="edit-textarea"></textarea>

            <div class="buttons" v-if="canEdit">
                <i v-if="!editing" id="edit" class="bi bi-pen-fill" @click="startEdit"></i>

                <i v-if="editing" class="bi bi-check-circle-fill" id="save" @click="saveEdit"></i>
                <i v-if="editing" class="bi bi-x-circle-fill" id="cancel" @click="cancelEdit"></i>

                <i @click.stop="showDeleteModal=true" id="delete" class="bi bi-trash-fill" @click="$emit('deleteComment', comment._id)"></i>
            </div>
        </div>



        <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal-content">
                <h5>Are you sure?</h5>
                <p>This action will permanently delete the comment.</p>
                <div class="modal-buttons" style="display: flex; justify-content: center; gap: 10px;">
                    <button class="btn btn-danger" @click.stop="confirmDelete">Delete</button>
                    <button class="btn btn-secondary" @click.stop="showDeleteModal = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Comment",
    props: {
        comment: { type: Object, required: true },
        canEdit: { type: Boolean, default: false }
    },
    data() {
        return {
            editing: false,
            editedContent: this.comment.content,
            showDeleteModal: false,
            deleting: false
        };
    },
    computed: {
        formattedDate() {
            return new Date(this.comment.date).toLocaleDateString();
        }
    },
    methods: {
        startEdit() {
            this.editing = true;
            this.editedContent = this.comment.content;
        },
        async saveEdit() {
            try {
                const res = await axios.patch(`http://localhost:9000/comments/${this.comment._id}`, {
                    content: this.editedContent
                });

                if (res.data?.success) {

                    this.comment.content = this.editedContent;
                    this.editing = false;


                    this.$emit("commentUpdated", {
                        id: this.comment._id,
                        content: this.editedContent
                    });
                }
            } catch (err) {
                console.error("Failed to update comment:", err);
            }
        },
        cancelEdit() {
            this.editedContent = this.comment.content;
            this.editing = false;
        },
    async confirmDelete() {
  if (this.deleting) return;
  this.deleting = true;

  try {
    const res = await axios.delete(`http://localhost:9000/comments/${this.comment._id}`);
    if (res.data?.success) {
    
      this.$emit("commentDeleted", this.comment._id);
    }
  } catch (err) {
    console.error("Failed to delete comment:", err);
  } finally {
    this.deleting = false;
    this.showDeleteModal = false;
  }
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

#save {
    font-size: 20px;
    color: green;
    transition: transform 0.2s;
}

#save:hover {
    transform: scale(1.2);
}

#cancel {
    font-size: 20px;
    color: red;
    cursor: pointer;
    transition: transform 0.2s;
}

#cancel:hover {
    transform: scale(1.2);
}

#edit_textarea {
    padding: 10px;
}
.modal-content {
  background-color: #adadb1;
  color: black;
  padding: 15px;
  font-family: "Pixelify Sans", sans-serif;
}
</style>