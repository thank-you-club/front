<template>
  <div id="app">
    <navbar-component :user="user" @logout="logout" />
    <transition name="slide-fade">
      <div style="min-height:80vh">
        <router-view />
      </div>
    </transition>
    <footer-component />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavbarComponent from '@/components/Shared/Navbar.vue';
import FooterComponent from '@/components/Shared/Footer.vue';
import { me } from '@/graphql/auth';
import { IUser } from '@/models/User';
// import { identify } from '@/analytics/utils';
@Component({
  components: {
    NavbarComponent,
    FooterComponent,
  },
  apollo: {
    me() {
      return { query: me(), skip: true };
    },
  },
})
export default class App extends Vue {
  public me: IUser = {};
  get user() {
    return this.$store.state.user;
  }
  public async mounted() {
    this.$apollo.queries.me.skip = false;
    let data: any = { data: {} };
    try {
      data = await this.$apollo.queries.me.refetch();
    } catch (err) {
      console.error(err);
    }
    if (data.data.me && data.data.me._id) {
      // identify(data.data.me);
      this.$store.commit('setUser', data.data.me);
      this.$store.commit('setToken', localStorage.getItem('token'));
      if (
        data.data &&
        data.data.me &&
        (this.$route.name === 'login' ||
          this.$route.name === 'register' ||
          this.$route.name === 'home')
      ) {
        this.$router.push({
          name: 'templates',
        });
      }
    } else if (
      this.$route.name !== 'terms' &&
      this.$route.name !== 'privacy-policies' &&
      this.$route.name !== 'register'
    ) {
      // identify();
      this.$router.push({
        name: 'login',
      });
    }
  }
  public logout() {
    this.$store.commit('setUser', null);
    this.$store.commit('setToken', null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.$router.push({ name: 'home' });
  }
}
</script>
