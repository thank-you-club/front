<template>
  <aside class="menu">
    <p class="menu-label">
      Thank you to
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'orgs' }"
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
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  public logout() {
    this.$store.commit('setUser', null);
    this.$store.commit('setToken', null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.$router.push({ name: 'home' });
  }
}
</script>
