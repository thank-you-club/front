<template>
  <section class="container">
    <user-form
      @submit="submit"
      :user="me"
      :isEmailUsed="isEmailUsed"
      :hasPassword="false"
      :isLoading="isLoading"
      confirmationMessage="Edit my profile"
      :isEmailDisabled="true"
    />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { me } from '@/graphql/auth';
import { IUser } from '@/models/User';
const UserForm = () => import('@/components/Users/UserForm.vue');
// import { identify } from '@/analytics/utils';
@Component({
  components: {
    UserForm,
  },
  apollo: {
    me() {
      return { query: me() };
    },
  },
})
export default class ProfileEdit extends Vue {
  public me: IUser = {};
  public isEmailUsed: boolean = false;
  public isLoading: boolean = false;
  public async submit(user: IUser) {
    try {
      this.isLoading = true;
      const argumentUser: IUser = Object.assign(
        {},
        { firstName: user.firstName, lastName: user.lastName },
      );
      await this.$store.dispatch('updateUser', argumentUser);
      await this.$apollo.queries.me.refetch();
      // identify(this.me);
      this.isLoading = false;
    } catch (err) {
      if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '400'
      ) {
        this.isEmailUsed = true;
        alert('This email is already used');
      } else {
        alert('An error has occured, please try again');
      }
    }
  }
}
</script>
