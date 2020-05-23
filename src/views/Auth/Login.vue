<template>
  <section class="container">
    <div class="hero">
      <div class="hero-body">
        <login-form @submit="submit" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/Auth/LoginForm.vue';
import { IUser } from '@/models/User';
// import { identify } from "../../analytics/utils";
@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {
  public async submit(user: IUser) {
    try {
      const data = await this.$store.dispatch('login', user);
      localStorage.setItem('token', data.data.login.token);
      localStorage.setItem('user', JSON.stringify(data.data.login.user));
      this.$store.commit('setUser', data.data.login.user);
      this.$store.commit('setToken', data.data.login.token);
      // identify(data.data.login.user);
      if (
        data.data.login.user.onBoardingStep === 0 ||
        typeof data.data.login.user.onBoardingStep === 'undefined'
      ) {
        this.$router.push({
          name: 'template-explanation',
        });
      } else {
        this.$router.push({
          name: 'templates',
        });
      }
    } catch (err) {
      alert('Wrong Email or Password');
      console.error(err);
    }
  }
}
</script>
