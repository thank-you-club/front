import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Base from '@/views/Base.vue';
import AuthedBase from '@/views/AuthedBase.vue';
import AuthRouter from '@/router/auth.router';
import ProfileRouter from '@/router/profile/profile.router';
import store from '@/store';
import orgsRouter from './orgs/orgs.router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    component: Base,
    children: AuthRouter,
    beforeEnter: (to, from, next) => {
      next(
        store.getters.getUser && store.getters.getUser._id
          ? { name: 'edit-profile' }
          : undefined,
      );
    },
  },
  {
    path: '/profile',
    component: AuthedBase,
    children: ProfileRouter,
  },
  {
    path: '/orgs',
    component: AuthedBase,
    children: orgsRouter,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
