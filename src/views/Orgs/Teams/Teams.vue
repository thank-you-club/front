<template>
  <section class="columns is-multiline">
    <div class="column is-12">
      <button
        class="button is-primary is-pulled-right"
        v-if="members.length > 0"
        @click.prevent="addMember"
      >
        Add a Member
      </button>
    </div>
    <div class="column is-12" v-if="members.length > 0">
      <member-table :users="members" />
    </div>
    <div
      class="column is-12 has-text-centered has-margin-top"
      v-if="!isLoading && members.length === 0"
    >
      <p class="is-size-4">No members yet? No problem!</p>
      <p class="is-size-5">Do it now!</p>
      <router-link :to="{ name: 'new-member' }">
        <button class="button is-primary has-margin-top">New Member</button>
      </router-link>
    </div>
    <div class="column is-12 has-text-centered" v-if="isLoading">
      <spinner />
    </div>
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
import MemberTable from '@/components/Users/UserTable.vue';
import Spinner from '@/components/Shared/Spinner.vue';
import { ITeam } from '@/models/Team';

import { getTeams } from '@/graphql/teams';
import { getOrgById } from '../../../graphql/orgs';
import { IOrg } from '../../../models/Org';

@Component({
  components: {
    TeamTable,
    MemberTable,
    Spinner,
  },
  apollo: {
    org: {
      query: getOrgById,
      loadingKey: 'isLoading',
      skip: true,
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
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
  public org: IOrg = {};
  public isLoading: boolean = true;
  public API_URL = process.env.VUE_APP_API_URL;
  private get members() {
    if (this.org && this.org.members && this.org.members.length > 0) {
      return this.org.members;
    }
    return [];
  }
  public mounted() {
    this.$apollo.queries.teams.setVariables({
      org: this.$route.params.orgId,
    });
    this.$apollo.queries.teams.skip = false;
    this.$apollo.queries.teams.refetch();
    this.$apollo.queries.org.setVariables({
      _id: this.$route.params.orgId,
    });
    this.$apollo.queries.org.skip = false;
    this.$apollo.queries.org.refetch();
  }
  public async deleteTeam(team: ITeam) {
    const promptInput = prompt('Are you sure? To confirm write DETELE');
    if (promptInput === 'DELETE') {
      await this.$store.dispatch('deleteTeam', team);
      await this.$apollo.queries.teams.refetch();
    }
  }
  public async addMember() {
    const promptInput = prompt('What\'s the email of your collegue?');
    await this.$store.dispatch('addMemberToOrg', {
      email: promptInput,
      org: this.org,
    });
    await this.$apollo.queries.org.refetch();
  }
}
</script>

<style lang="scss" scoped>
.has-margin-top {
  margin-top: 48px;
}
</style>
