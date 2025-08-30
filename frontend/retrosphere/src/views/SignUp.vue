<template>
    <div class="signup">
        <div class="form">
            <h5 style=" font-family: 'Pixelify Sans', sans-serif;">Join the adventure !</h5>
            <input type="email" v-model="email" class="form-control" placeholder="frodobaggins@shire.com">
            <input type="text" v-model="username" class="form-control" placeholder="FrodoTheRingBearer">
            <input type="password" v-model="password" class="form-control" placeholder="********">
            <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm password">
            <div
                style="display: flex;flex-direction: row;justify-content: space-between;align-items: center; gap: 10px;width: 100%;">
                <button id="register_btn" @click="register" type="button" class="btn">Register</button>
                <router-link to="/">
                    <button id="register_btn" type="button" class="btn">Return home!</button>
                </router-link>
            </div>
            <h3 v-if="error === false" style="margin-top: 10px; font-family: 'Pixelify Sans', sans-serif;">Successful
                login...
            </h3>
            <h3 v-if="error" style="margin-top: 10px; font-family: 'Pixelify Sans', sans-serif;color: red;">
                Login failed...</h3>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "SignUp",
    data() {
        return {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            image: "avatar0.png",
            error: null
        };
    },
    methods: {
        register() {

            if (!this.email) {
                this.error = true;
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
                this.error = true;
                return;
            }

            if (this.password == this.confirmPassword && this.password.length > 6) {
                let newUser = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    image: this.image,
                }
                axios.post('http://localhost:9000/register', newUser)
                    .then(res => {
                        if (res.data.success) {
                            this.error = false;
                            this.$router.push({ name: 'Home' });
                        }
                    })
                    .catch(err => {
                        this.error = true;
                        if (err.response && err.response.data?.message) {
                            console.error("Registration error:", err.response.data.message);
                        } else {
                            console.error("Registration error:", err);
                        }
                    });
            } else {
                this.error = true;
            }
        }
    },
};
</script>

<style scoped>
.signup {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-top: 80px;
    margin-bottom: 100px;
    min-height: 100vh;
}

.form {
    background-color: #0f380f;
    color: white;
    width: 30%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    gap: 20px;
}

input {
    border: none;
    color: #9bbc0f;
    font-family: "Jersey 15", sans-serif;
    background-color: #306230;
    outline: none;

}

input::placeholder {
    color: #9bbc0f;
    opacity: 1;
}

input:focus {
    color: #9bbc0f;
    background-color: #306230;
    box-shadow: none;
}

#register_btn {
    background-color: #9bbc0f;
    font-family: "Pixelify Sans", sans-serif;
}

@media screen and (max-width: 768px) {
    .form {
        width: 100%;
    }
}
</style>