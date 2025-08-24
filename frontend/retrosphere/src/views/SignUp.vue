<template>
    <div class="signup">
        <div class="form">
            <h5 style=" font-family: 'Pixelify Sans', sans-serif;">Join the adventure !</h5>
            <input type="text" class="form-control" placeholder="frodobaggins@shire.com">
            <input type="password" class="form-control" placeholder="********">
            <div
                style="display: flex;flex-direction: row;justify-content: space-between;align-items: center; gap: 10px;width: 100%;">
                <button id="register_btn" type="button" class="btn">Register</button>
                <router-link to="/">
                    <button id="register_btn" type="button" class="btn">Return home!</button>
                </router-link>

            </div>
        </div>
    </div>
</template>

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