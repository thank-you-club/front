import Vue from 'vue';
import Vuex from 'vuex';

import apollo from '../apolloClient';
import { IUser } from '@/models/User';
import { updateUser, updatePassword } from '@/graphql/users';
import { verifyDomain, addDomain } from '@/graphql/domains';
import { login, register } from '@/graphql/auth';
import { insertOrg, updateOrg, deleteOrg } from '@/graphql/orgs';
import {
  updateTeam,
  insertTeam,
  deleteTeam,
  addMemberToOrg,
  addMemberToOrgTeam,
} from '@/graphql/teams';
import { IOrg } from '@/models/Org';
import { ITeam } from '@/models/Team';
import { nextCycle } from '@/graphql/cycle';
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
    async updateOrg(context, org) {
      // trackEditTemplate(org);
      return await apollo.mutate({
        mutation: updateOrg(org),
      });
    },
    async insertOrg(context, org) {
      // trackInsertTemplate(org);
      return await apollo.mutate({
        mutation: insertOrg(org),
      });
    },
    async deleteOrg(context, org) {
      // trackInsertTemplate(org);
      return await apollo.mutate({
        mutation: deleteOrg(org),
      });
    },
    async updateTeam(context, team) {
      return await apollo.mutate({
        mutation: updateTeam(team),
      });
    },
    async insertTeam(context, team) {
      return await apollo.mutate({
        mutation: insertTeam(team),
      });
    },
    async deleteTeam(context, team) {
      return await apollo.mutate({
        mutation: deleteTeam(team),
      });
    },
    async updatePassword(context, args) {
      return await apollo.mutate({
        mutation: updatePassword(args.oldPassword, args.password),
      });
    },
    async addMemberToOrg(
      context,
      { email, org }: { email: string; org: IOrg },
    ) {
      return await apollo.mutate({
        mutation: addMemberToOrg({ email, org }),
      });
    },
    async addMemberToOrgTeam(
      context,
      { email, team }: { email: string; team: ITeam },
    ) {
      return await apollo.mutate({
        mutation: addMemberToOrgTeam({ email, team }),
      });
    },
    async nextCycle(context, team: ITeam) {
      return await apollo.mutate({
        mutation: nextCycle(team),
      });
    },
  },
  modules: {},
});
