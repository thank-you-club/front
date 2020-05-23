<template>
  <section>
    <team-form
      :team="team"
      :isLoading="isLoading"
      :plan="user.plan"
      @submit="submit"
      @back="back"
    />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TeamForm from '@/components/Teams/TeamForm.vue';
import { getTeams, getTeamById } from '@/graphql/teams';
import { ITeam } from '@/models/Team';
@Component({
  components: {
    TeamForm,
  },
  apollo: {
    team() {
      return {
        query: getTeamById,
        skip: true,
        variables: {
          _id: 'init',
        },
      };
    },
  },
})
export default class Teams extends Vue {
  public team: ITeam = {};
  public isLoading = false;
  public async submit() {
    try {
      this.isLoading = true;
      const data = await this.$store.dispatch('updateTeam', this.team);
      this.$router.push({
        name: 'teams',
      });
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
  public async mounted() {
    this.isLoading = true;
    this.$apollo.queries.team.setVariables({
      _id: this.$route.params.teamId,
    });
    this.$apollo.queries.team.skip = false;
    await this.$apollo.queries.team.refetch();
    this.isLoading = false;
  }
  get user() {
    return this.$store.getters.getUser;
  }
}
</script>
