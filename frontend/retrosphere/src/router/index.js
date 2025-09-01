import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Add from '../views/Add.vue';
import SignUp from '../views/SignUp.vue';
import PostDetails from '../views/PostDetails.vue';
import Profile from '../views/Profile.vue';
import EditPost from '../views/EditPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/post/:id',
    name: 'PostDetails',
    component: PostDetails,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/edit_post/:id',
    name: 'EditPost',
    component: EditPost,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;