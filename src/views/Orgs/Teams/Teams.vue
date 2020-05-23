<template>
  <section class="columns is-multiline">
    <div class="column is-12">
      <router-link :to="{ name: 'new-team' }">
        <button
          class="button is-primary is-pulled-right"
          v-if="teams.length > 0"
        >
          New Team
        </button>
      </router-link>
    </div>
    <div class="column is-12" v-if="teams.length > 0">
      <team-table :teams="teams" @delete="deleteTeam" />
    </div>
    <div
      class="column is-12 has-text-centered has-margin-top"
      v-if="!isLoading && teams.length === 0"
    >
      <p class="is-size-4">No teams yet? No problem!</p>
      <p class="is-size-5">Do it now!</p>
      <router-link :to="{ name: 'new-team' }">
        <button class="button is-primary has-margin-top">New Team</button>
      </router-link>
    </div>
    <div class="column is-12 has-text-centered" v-if="isLoading">
      <spinner />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TeamTable from '@/components/Teams/TeamTable.vue';
import Spinner from '@/components/Shared/Spinner.vue';
import { ITeam } from '@/models/Team';

import { getTeams } from '@/graphql/teams';

@Component({
  components: {
    TeamTable,
    Spinner,
  },
  apollo: {
    teams: {
      query: getTeams,
      loadingKey: 'isLoading',
      skip: true,
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
  },
})
export default class Teams extends Vue {
  public teams: ITeam[] = [];
  public isLoading: boolean = true;
  public API_URL = process.env.VUE_APP_API_URL;
  public mounted() {
    this.$apollo.queries.teams.setVariables({
      org: this.$route.params.orgId,
    });
    this.$apollo.queries.teams.skip = false;
    this.$apollo.queries.teams.refetch();
  }
  public async deleteTeam(team: ITeam) {
    const promptInput = prompt('Are you sure? To confirm write DETELE');
    if (promptInput === 'DELETE') {
      await this.$store.dispatch('deleteTeam', team);
      await this.$apollo.queries.teams.refetch();
    }
  }
}
</script>

<style lang="scss" scoped>
.has-margin-top {
  margin-top: 48px;
}
</style>
