import Vue from 'vue';
import Vuex from 'vuex';

import apollo from '../apolloClient';
import { IUser } from '@/models/User';
import { updateUser } from '@/graphql/users';
import { verifyDomain, addDomain } from '@/graphql/domains';
import { login, register } from '@/graphql/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: '',
  },
  getters: {
    getUser(state): IUser {
      return state.user;
    },
    getToken(state): string {
      return state.token;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit('setUser', user);
    },
    setToken(context, token) {
      context.commit('setToken', token);
    },
    async updateUser(context, args) {
      return await apollo.mutate({
        mutation: updateUser(args),
      });
    },
    async addDomain(context, domain) {
      // trackAddDomain(domain);
      return await apollo.mutate({
        mutation: addDomain(domain),
      });
    },
    async verifyDomain(context, domain) {
      // trackAddDomain(domain);
      return await apollo.mutate({
        mutation: verifyDomain(domain),
      });
    },
    async login(context, user: IUser) {
      return await apollo.mutate({
        mutation: login(user),
      });
    },
    async register(context, user: IUser) {
      return await apollo.mutate({
        mutation: register(user),
      });
    },
  },
  modules: {},
});
