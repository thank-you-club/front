<template>
  <aside class="menu">
    <p class="menu-label">
      Thank you to
    </p>
    <ul class="menu-list">
      <li v-for="org in orgs" :key="org._id">
        <router-link :to="{ name: 'teams', params: { orgId: org._id } }">
          {{ org.name }}</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'new-org' }"
          ><i class="fa fa-plus-circle has-text-primary" /> Add Org</router-link
        >
      </li>
    </ul>
    <p class="menu-label">
      Account
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'edit-profile' }">Edit profile</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'edit-password' }"
          >Change password</router-link
        >
      </li>
      <li>
        <a @click="logout">Logout</a>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IOrg } from '../../models/Org';
@Component
export default class Home extends Vue {
  @Prop({
    required: true,
  })
  public orgs!: IOrg[];
  public logout() {
    this.$store.commit('setUser', null);
    this.$store.commit('setToken', null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.$router.push({ name: 'home' });
  }
}
</script>
