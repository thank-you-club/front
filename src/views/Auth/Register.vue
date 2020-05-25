<template>
  <section class="container">
    <div style="width:100%">
      <figure class="image is-128x128">
        <!-- <img src="@/assets/logo.png" /> -->
      </figure>
    </div>
    <user-form
      :user="user"
      confirmationMessage="Register"
      @submit="submit"
      :hasCheckboxes="true"
      @error="error"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserForm from '@/components/Users/UserForm.vue';
import { IUser } from '@/models/User';
// import { identify } from "../../analytics/utils";
@Component({
  components: {
    UserForm,
  },
})
export default class Register extends Vue {
  public user: IUser = {
    password: '',
    isSubscribedToNewsletter: true,
    isAgreeingToTermsOfService: false,
  };
  public error(err: number) {
    if (err === 400) {
      alert('Both password must match!');
    } else {
      alert('You must agree to the terms of service!');
    }
  }
  public async submit(user: IUser) {
    try {
      const data = await this.$store.dispatch('register', user);
      localStorage.setItem('token', data.data.register.token);
      localStorage.setItem('user', JSON.stringify(data.data.register.user));
      this.$store.commit('setUser', data.data.register.user);
      this.$store.commit('setToken', data.data.register.token);
      // identify(data.data.register.user);
      this.$router.push({
        name: 'template-explanation',
      });
    } catch (err) {
      if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '400'
      ) {
        alert('This email is already used by another used');
      } else if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '400'
      ) {
        // tslint:disable-next-line:quotemark
        alert("This email adress doesn't exist");
      } else {
        alert('An error has occured please try again');
        console.error(err);
      }
    }
  }
}
</script>

<style lang="scss">
.image {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
