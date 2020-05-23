<template>
  <nav
    class="navbar"
    id="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://thank-you.club">
        <img src="@/assets/logo.png" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="toggleNavbar"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div
      :class="'navbar-menu '.concat(hasOpenMenu === true ? 'is-active' : '')"
    >
      <div class="navbar-end" @click="toggleNavbar">
        <router-link
          class="navbar-item is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"
          :to="{ name: 'orgs' }"
          v-if="isLoggedIn"
        >
          Orgs
        </router-link>
        <router-link
          class="navbar-item is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"
          :to="{ name: 'edit-profile' }"
          v-if="isLoggedIn"
        >
          Profile
        </router-link>
        <router-link
          class="navbar-item is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"
          :to="{ name: 'edit-password' }"
          v-if="isLoggedIn"
        >
          Edit password
        </router-link>
        <!-- <router-link
          class="navbar-item is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"
          :to="{ name: 'support' }"
        >
          Support
        </router-link> -->
        <span class="navbar-item is-hidden-mobile" v-if="isLoggedIn"
          >Hello {{ user.firstName }}!</span
        >
        <div class="navbar-item">
          <div class="buttons">
            <router-link
              class="button is-primary"
              :to="{ name: 'login' }"
              v-if="!isLoggedIn"
              >Login</router-link
            >
            <router-link
              class="button is-primary is-outlined"
              :to="{ name: 'register' }"
              v-if="!isLoggedIn"
              >Register</router-link
            >
            <button
              class="button is-primary is-hidden-tablet-only is-hidden-desktop-only is-hidden-widescreen-only"
              type="button"
              v-if="isLoggedIn"
              @click="$emit('logout')"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '@/models/User';
declare var document: any;
@Component
export default class NavbarComponent extends Vue {
  get isLoggedIn() {
    return (
      typeof this.user !== 'undefined' &&
      this.user !== null &&
      typeof this.user._id !== 'undefined'
    );
  }
  public hasOpenMenu: boolean = false;
  @Prop() public user!: IUser;
  public toggleNavbar(): void {
    this.hasOpenMenu = !this.hasOpenMenu;
  }
}
</script>

<style lang="scss" scoped>
.navbar-item img {
  padding: 0px;
  max-width: 44px;
  max-height: 44px;
}
.navbar-brand.navbar-item {
  padding-top: 0px;
  padding-bottom: 0px;
}
</style>
