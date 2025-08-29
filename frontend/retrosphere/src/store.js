import { reactive } from "vue";

export const store = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  get isLoggedIn() {
    return !!this.token;
  },
  login(userData, token) {
    this.user = userData;
    this.token = token;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  },
  logout() {
    this.user = null;
    this.token = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
});