<template>
        <div class="edit">
            <div
                style="width: 100%; font-family: 'Pixelify Sans', sans-serif; font-size: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <label for="add_text" class="form-label">Edit your thought!</label>
                <select v-model="category" id="select" class="form-select">
                    <option value="pc">PC</option>
                    <option value="sony">Sony</option>
                    <option value="nintendo">Nintendo</option>
                    <option value="sega">Sega</option>
                    <option value="atari">Atari</option>
                </select>
                <input v-model="title" type="text" class="form-control" id="title" placeholder="Title">
                <textarea v-model="content" class="form-control" id="add_text" placeholder="Content"
                    rows="10"></textarea>
                <div
                    style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 40px; margin-top: 20px;">
                    <i id="add_post" @click="updatePost" class="bi bi-joystick" data-bs-toggle="tooltip"
                        title="Add a new post"></i>
                    <i id="cancel" @click="cancel" class="bi bi-crosshair" data-bs-toggle="tooltip" title="Cancel"></i>
                </div>

                <h4 v-if="this.error === false">Successfuly updated !</h4>
                <h4 v-if="this.error" style="color: red;">Updating failed !</h4>

            </div>
        </div>
    </template>

<script>
import axios from "axios";
import { store } from "../store.js";
export default {
    data() {
        return {
            title: "",
            content: "",
            category: "pc",
            error: null
        }
    },
    methods: {

        async fetchPost() {
            try {
                const id = this.$route.params.id;
                const res = await axios.get(`http://localhost:9000/posts/${id}`);
                const post = res.data;

                this.title = post.title;
                this.content = post.content;
                this.category = post.category;
            } catch (err) {
                console.error("Error fetching post:", err);
                this.error = true;
            }
        },

        cancel() {
            this.$router.push({ name: "Home" });
        },
        async updatePost() {
            try {
                const id = this.$route.params.id;
                const updated = {
                    title: this.title,
                    content: this.content,
                    category: this.category,
                };

                const res = await axios.put(`http://localhost:9000/posts/${id}`, updated);

                if (res.data.success) {
                    this.$router.push({ name: "Home" });
                } else {
                    this.error = true;
                }
            } catch (err) {
                console.error("Update failed:", err);
                this.error = true;
            }
        }
    },
    created() {
        this.fetchPost();
    },
    computed: {
        store() {
            return store;
        }
    }
}
</script>

<style scoped>
.edit {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    min-height: 100vh;
}

#add_text {
    width: 80%;
    font-size: 18px;
    border: 3px solid #333;
    border-radius: 6px;
    margin: 10px 0;
    color: #000000;
    font-family: "Jersey 15", sans-serif;
    font-size: 20px;
}

#add_post {
    font-size: 50px;
    color: #306230;
    cursor: pointer;
    transition: color 0.3s ease;
}

#cancel {
    font-size: 50px;
    color: #b03030;
    cursor: pointer;
    transition: color 0.3s ease;
}

#title {
    width: 80%;
    font-size: 18px;
    border: 3px solid #333;
    border-radius: 6px;
    margin: 10px 0;
    color: #000000;
    font-family: "Jersey 15", sans-serif;
    font-size: 20px;
}

#select {
    width: 80%;
    font-size: 18px;
    border: 3px solid #333;
    border-radius: 6px;
    margin: 10px 0;
    color: #000000;
    font-family: "Jersey 15", sans-serif;
    font-size: 20px;
}
</style>