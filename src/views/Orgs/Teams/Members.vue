<template>
  <section class="columns is-multiline">
    <div class="column is-12">
      <button
        class="button is-primary is-pulled-right"
        v-if="members.length > 0 && team.owner && team.owner._id === user._id"
        @click.prevent="addMember"
      >
        Add a Member
      </button>
    </div>
    <div class="column is-12" v-if="members.length > 0">
      <member-table
        :users="members"
        @delete="deleteMember"
        :owner="team.owner"
      />
    </div>
    <div
      class="column is-12 has-text-centered has-margin-top"
      v-if="
        !isLoading &&
          members.length === 0 &&
          team.owner &&
          team.owner._id === user._id
      "
    >
      <p class="is-size-4">No members yet? No problem!</p>
      <p class="is-size-5">Do it now!</p>
      <button
        class="button is-primary has-margin-top"
        @click.prevent="addMember"
      >
        New Member
      </button>
    </div>
    <div class="column is-12 has-text-centered" v-if="isLoading">
      <spinner />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MemberTable from '@/components/Users/UserTable.vue';
import Spinner from '@/components/Shared/Spinner.vue';
import { getTeamById } from '../../../graphql/teams';
import { IUser } from '../../../models/User';
import { ITeam } from '../../../models/Team';
import { getOrgById } from '../../../graphql/orgs';
import { IOrg } from '../../../models/Org';

@Component({
  components: {
    MemberTable,
    Spinner,
  },
  apollo: {
    team: {
      query: getTeamById,
      loadingKey: 'isLoading',
      skip: true,
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
  },
})
export default class Members extends Vue {
  private get members() {
    if (this.team && this.team.members && this.team.members.length > 0) {
      return this.team.members;
    }
    return [];
  }
  public isLoading: boolean = true;
  public API_URL = process.env.VUE_APP_API_URL;
  private team: ITeam = {};
  private org: IOrg = {};
  private get user() {
    return this.$store.getters.getUser;
  }
  public mounted() {
    this.$apollo.queries.team.setVariables({
      _id: this.$route.params.teamId,
    });
    this.$apollo.queries.team.skip = false;
    this.$apollo.queries.team.refetch();
  }
  public async deleteMember(member: IUser) {
    const promptInput = prompt('Are you sure? To confirm write DETELE');
    if (promptInput === 'DELETE') {
      await this.$store.dispatch('deleteMember', member);
      await this.$apollo.queries.team.refetch();
    }
  }
  public async addMember() {
    const promptInput = prompt("What's the email of your collegue?");
    await this.$store.dispatch('addMemberToOrgTeam', {
      email: promptInput,
      team: this.team,
    });
    await this.$apollo.queries.team.refetch();
  }
}
</script>

<style lang="scss" scoped>
.has-margin-top {
  margin-top: 48px;
}
</style>
