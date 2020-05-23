<template>
  <section>
    <team-form
      :team="team"
      :isLoading="isLoading"
      @submit="submit"
      @back="back"
      :plan="user.plan"
    />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TeamForm from '@/components/Teams/TeamForm.vue';
import { ITeam } from '@/models/Team';
import { IUser } from '@/models/User';
@Component({
  components: {
    TeamForm,
  },
  apollo: {},
})
export default class Teams extends Vue {
  public team: ITeam = {};
  public isLoading = false;
  get user(): IUser {
    return this.$store.getters.getUser;
  }
  public async submit() {
    try {
      this.isLoading = true;
      this.team.org = { _id: this.$route.params.orgId };
      const data = await this.$store.dispatch('insertTeam', this.team);
      if (this.user.onBoardingStep === 2) {
        this.$router.push({
          name: 'documents-form',
        });
      } else {
        this.$router.push({
          name: 'teams',
        });
      }
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '412'
      ) {
        alert(
          'Domain invalid. Make sure you verify your domain before trying to send an email from it.',
        );
      } else if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '409'
      ) {
        alert(
          'This domain is being used by another user, contact us if this is an error',
        );
      } else {
        alert('An error has occured please try again');
        console.error(err);
      }
    }
  }
  public back() {
    this.$router.push({ name: 'teams' });
  }
}
</script>
