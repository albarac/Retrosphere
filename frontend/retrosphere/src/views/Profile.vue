<template>
    <div class="profile">
        <div class="box">
            <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                <img id="avatar" :src="`/avatars/${store.user.image}`" class="img-fluid" alt="Avatar">
                <h2>User Profile</h2>
            </div>

            <div style="display: flex; flex-direction: row; gap: 20px; align-items: center;">
                <h5>Username: {{ store.user?.username || "Guest" }}</h5>
                <h5>Email: {{ store.user?.email || "guest@gmail.com" }}</h5>
            </div>
            <h5>Change Profile Picture:</h5>
            <div class="avatar-selection">
                <div v-for="avatar in avatars" :key="avatar" class="avatar-option" @click="changeAvatar(avatar)">
                    <img :src="`/avatars/${avatar}`" alt="avatar option">
                </div>
            </div>
            <button style="margin-top: 10px;" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"
                class="btn btn-danger">Delete Account</button>
        </div>


        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="loginModalLabel"
                            style="font-family: 'Pixelify Sans', sans-serif; color:#9bbc0f;; ">Are you sure traveler !
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>By doing this you will be setting things in motion that cannot be undone !</p>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">

                        <div style="display: flex; gap: 10px;">
                            <button id="modal_btn" type="button" class="btn" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger">Delete Account</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store';

export default {
    name: "Profile",
    data() {
        return {
            avatars: [
                "avatar0.png",
                "avatar1.png",
                "avatar2.png",
            ]
        };
    },
    methods: {
        async changeAvatar(filename) {
            try {
                const userId = store.user._id;
                const res = await axios.put(`http://localhost:9000/users/${userId}/avatar`, {
                    avatar: filename
                });

                if (res.data.success) {
                    store.user.image = filename;
                    const user = { ...store.user, image: filename };
                    localStorage.setItem("user", JSON.stringify(user));
                }
            } catch (err) {
                console.error("Avatar update failed:", err);
            }
        }
    },
    computed: {
        store() {
            return store;
        }
    }
};
</script>

<style scoped>
.profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 100px;
    min-height: 100vh;
    font-family: "Jersey 15", sans-serif;
}

.box {
    background-color: #306230;
    color: white;
    width: 30%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 10px;
    gap: 20px;
}

#avatar {
    width: 50px;
    height: 50px;
}

.avatar-selection {
    display: flex;
    gap: 15px;
    margin-top: 10px;
}

.avatar-option {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 0.2s;
}

.avatar-option:hover {
    border: 2px solid #9bbc0f;
}

.avatar-option img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-content {
    background-color: #0f380f;
    color: white;
}

.modal-header {
    border-top: #9bbc0f;
    border-color: #9bbc0f;
}

.modal-footer {
    border: none;
}

input::placeholder {
    color: #9bbc0f;
    opacity: 1;
}

#modal_btn {
    background-color: #9bbc0f;
    font-family: "Jersey 15", sans-serif;
}
</style>