<template>
  <nav id="navbar" class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <router-link to="/" style="text-decoration: none;">
        <a class="navbar-brand text-white">Retrosphere</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarNavDropdown">

        <router-link v-if="store.isLoggedIn" to="/add">
          <i id="add_post" class="bi bi-dpad-fill"></i>
        </router-link>

        <ul class="navbar-nav mx-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Dropdown 1
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Dropdown 2
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action A</a></li>
              <li><a class="dropdown-item" href="#">Action B</a></li>
              <li><a class="dropdown-item" href="#">Action C</a></li>
            </ul>
          </li>
        </ul>

        <router-link v-if="store.isLoggedIn" to="/profile">
          <i id="profile" class="bi bi-person-bounding-box"></i>
        </router-link>


        <button v-if="!store.isLoggedIn" type="button" class="btn" id="login" @click="showLoginModal">Login</button>
        <button v-if="store.isLoggedIn" type="button" class="btn" id="login" @click="logout">Logout</button>


      </div>
    </div>

    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true"
      data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="loginModalLabel"
              style="font-family: 'Pixelify Sans', sans-serif; color:#9bbc0f;; ">Speak
              friend and enter !</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input v-model="email" type="text" class="form-control" placeholder="frodobaggins@shire.com">
            <input v-model="password" type="password" class="form-control" placeholder="********">
          </div>
          <div class="modal-footer d-flex justify-content-between">

            <router-link to="/signup">
              <button id="modal_btn" data-bs-dismiss="modal" type="button" class="btn">Sign Up</button>
            </router-link>


            <div style="display: flex; gap: 10px;">
              <button id="modal_btn" type="button" class="btn" data-bs-dismiss="modal">Close</button>
              <button @click="login" id="modal_btn" type="button" class="btn">Login</button>
            </div>


          </div>
          <h3 v-if="error === false" style="margin-top: 10px; font-family: 'Pixelify Sans', sans-serif;">Successful
            login...
          </h3>
          <h3 v-if="error" style="margin-top: 10px; font-family: 'Pixelify Sans', sans-serif;color: red;">
            Login failed...</h3>
        </div>
      </div>
    </div>
  </nav>


</template>

<script>
import { store } from "../store"
import axios from 'axios';
import * as bootstrap from "bootstrap";
export default {
  name: "Navbar",
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  mounted() {
    const modalEl = document.getElementById("loginModal");
    this.loginModal = new bootstrap.Modal(modalEl, {
      backdrop: "static",
      keyboard: false,
    });
  },

  methods: {
    showLoginModal() {
      this.loginModal.show();
    },
    login() {
      const user = {
        email: this.email,
        password: this.password
      };

      axios.post("http://localhost:9000/login", user)
        .then((res) => {
          if (res.data.token) {
            this.error = false;
            store.login(res.data.userData, res.data.token);


            this.loginModal.hide();
            this.email="";
            this.password="";
            this.error=null;

            this.$router.push({ name: "Home" });
          } else if (res.data.error) {
            this.error = true;
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          this.error = true;
        });
    },
    logout() {
      store.logout();
      this.$router.push({ name: "Home" });
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
#navbar {
  background-color: #306230 !important;
  padding: 10px;
  border-radius: 10px;
  font-family: "Pixelify Sans", sans-serif;
}

#login {
  background-color: #9bbc0f;
}

#add_post {
  color: white;
  font-size: 20px;
  cursor: pointer;
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

.modal-body input {
  margin-top: 20px;
  border: none;
  color: #9bbc0f;
  font-family: "Jersey 15", sans-serif;
  background-color: #306230;
}

input::placeholder {
  color: #9bbc0f;
  opacity: 1;
}

#modal_btn {
  background-color: #9bbc0f;
  font-family: "Pixelify Sans", sans-serif;
}

#profile {
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>