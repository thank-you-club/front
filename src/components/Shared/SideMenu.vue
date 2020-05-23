<template>
  <aside class="menu">
    <p class="menu-label">
      Iva Generator
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'documents-form' }">Generator</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'templates' }">Templates</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'integrations-drive' }"
          >Integrations</router-link
        >
      </li>
    </ul>
    <p class="menu-label">
      Iva Converter
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'converters-pdf' }">Converter</router-link>
      </li>
    </ul>
    <p class="menu-label">
      Iva Resources
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'template-explanation' }"
          >Tutorial</router-link
        >
      </li>
      <li>
        <a
          href="https://documenter.getpostman.com/view/11039305/SzYgRvVW?version=latest"
          target="blank"
          >Api documentation</a
        >
      </li>
      <li>
        <a href="https://www.iva-docs.com/blog" target="blank">Iva blog</a>
      </li>
    </ul>
    <p class="menu-label">
      Iva Emails
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'domain' }"
          >Custom domain<span class="tag is-warning">Beta</span></router-link
        >
      </li>
    </ul>
    <p class="menu-label">
      Iva for developers
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'api-keys' }">Api</router-link>
      </li>
    </ul>
    <p class="menu-label">
      Account
    </p>
    <ul class="menu-list">
      <li>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'edit-profile' }">Edit profile</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'edit-password' }"
          >Change password</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'billing' }">Billing</router-link>
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
