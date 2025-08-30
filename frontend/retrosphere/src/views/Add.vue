<template>
        <div class="add">
            <div
                style="width: 100%; font-family: 'Pixelify Sans', sans-serif; font-size: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <label for="add_text" class="form-label">Cast your thoughts into the fire!</label>
                <input v-model="title" type="text" class="form-control" id="title" placeholder="Title">
                <textarea v-model="content" class="form-control" id="add_text" placeholder="Content"
                    rows="10"></textarea>
                <div
                    style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 40px; margin-top: 20px;">
                    <i id="add_post" @click="addPost" class="bi bi-joystick" data-bs-toggle="tooltip"
                        title="Add a new post"></i>
                    <i id="cancel" @click="cancel" class="bi bi-crosshair" data-bs-toggle="tooltip" title="Cancel"></i>
                </div>

                <h4 v-if="this.error===false">Successfuly posted !</h4>
                <h4 v-if="this.error" style="color: red;">Posting failed !</h4>

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
            error: null
        }
    },
    methods: {
        addPost() {
            if (this.title.trim() === "" || this.content.trim() === "") {
                this.error = true
                return;
            }
            let post = {
                title: this.title,
                content: this.content,
                date: new Date(),
                userId: store.user._id,
                comments: []
            };
            axios.post("http://localhost:9000/newPost", post).then((res) => {
                console.log("Response post: ", res.data);
                if (res.data) {
                    this.$router.push({ name: "Home" });
                } else {
                    console.log("Error posting data!");
                }
            });
            this.error = false;
        },
        cancel() {
            this.title = "";
            this.content = "";
            this.$router.push({ name: "Home" });
        }
    },
    computed: {
        store() {
            return store;
        }
    }
}
</script>

<style scoped>
.add {
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
</style>