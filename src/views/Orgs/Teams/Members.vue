<template>
  <section class="columns is-multiline content">
    <div class="column is-12">
      <router-link :to="{ name: 'leaderboard' }">
        <button
          class="button is-primary is-pulled-right is-outlined"
          v-if="members.length > 0"
        >
          Leaderboard
        </button></router-link
      >
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
        :transactions="currentCycle.transactions"
        @endorse="endorseMember"
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
    <div class="column is-12">
      <h3>My points: {{ myPoints }}</h3>
      <button
        class="button is-primary is-pulled-right"
        v-if="members.length > 0 && team.owner && team.owner._id === user._id"
        @click.prevent="nextCycle"
      >
        Next cycle
      </button>
    </div>
    <div class="column is-12">
      <div class="column is-12" v-for="c of processedCycles" :key="c._id">
        <h5>{{ getCycleTitle(c) }}</h5>
        <ol>
          <li v-for="p of processedTransactions(c)" :key="p._id">
            {{ p.target.firstName }} {{ p.target.lastName }}: {{ p.value }}
          </li>
        </ol>
      </div>
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
import { ICycle } from '../../../models/Cycle';
import { ITransaction } from '../../../models/Transaction';
import { getCycles } from '../../../graphql/cycle';
import * as moment from 'moment';
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
    cycles: {
      query: getCycles,
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
  private cycles: ICycle[] = [];
  private org: IOrg = {};
  private get user() {
    return this.$store.getters.getUser;
  }
  private get currentCycle() {
    const cycle =
      this.cycles && this.cycles.length > 0
        ? this.cycles.find((e) => e.endDate === -1)
        : null;
    return cycle ? cycle : { transactions: [] };
  }
  public getCycleTitle(cycle: ICycle) {
    return `${moment
      .unix(cycle && cycle.startDate ? cycle.startDate : 0)
      .format('MMMM, DD - YYYY ')}`;
  }

  public processedTransactions(cycle: ICycle): ITransaction[] {
    const dict = cycle.transactions.reduce(
      (p: { [key: string]: ITransaction }, c: ITransaction) => {
        const id = c.target && c.target._id ? c.target._id : '-1';
        if (!p[id]) {
          p[id] = Object.assign({}, c);
        } else {
          p[id].value += c.value;
        }
        return p;
      },
      {},
    );
    return Object.values(dict)
      .sort((a, b) => (a.value < b.value ? 1 : -1))
      .filter((e) => e.value > 0);
  }
  get processedCycles(): ICycle[] {
    return this.cycles.filter(
      (e) => this.processedTransactions(e).reduce((p, c) => p + c.value, 0) > 0,
    );
  }

  get myPoints(): number {
    return (
      1000 -
      this.currentCycle.transactions
        .filter((e: ITransaction) => e.issuer === this.user._id)
        .reduce((p, c) => p + c.value, 0)
    );
  }

  public mounted() {
    this.$apollo.queries.team.setVariables({
      _id: this.$route.params.teamId,
    });
    this.$apollo.queries.team.skip = false;
    this.$apollo.queries.team.refetch();

    this.$apollo.queries.cycles.setVariables({
      team: this.$route.params.teamId,
    });
    this.$apollo.queries.cycles.skip = false;
    this.$apollo.queries.cycles.refetch();
  }
  public async deleteMember(member: IUser) {
    const promptInput = prompt('Are you sure? To confirm write DETELE');
    if (promptInput === 'DELETE') {
      await this.$store.dispatch('deleteMember', member);
      await this.$apollo.queries.team.refetch();
    }
  }
  public async addMember() {
    const promptInput = prompt('Got an email for me?');
    await this.$store.dispatch('addMemberToOrgTeam', {
      email: promptInput,
      team: this.team,
    });
    await this.$apollo.queries.team.refetch();
  }
  public async nextCycle() {
    const confirmation = confirm(
      'Are you sure you want to start the next cycle?',
    );
    if (confirmation) {
      this.isLoading = true;
      await this.$store.dispatch('nextCycle', this.team);
      await this.$apollo.queries.cycles.refetch();
      this.isLoading = false;
    }
  }

  public async endorseMember(member: IUser) {
    const promptInput = prompt('How many points do you want to give?');
    if (
      promptInput &&
      parseInt(promptInput, 10) < 1000 &&
      parseInt(promptInput, 10) > 0
    ) {
      await this.$store.dispatch('endorseMember', {
        team: this.team,
        member,
        value: parseInt(promptInput, 10),
      });
      await this.$apollo.queries.team.refetch();
    }
  }
}
</script>

<style lang="scss" scoped>
.has-margin-top {
  margin-top: 48px;
}
.button {
  margin-left: 8px;
  margin-right: 8px;
}
</style>
