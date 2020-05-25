<template>
  <section class="columns is-multiline content">
    <div
      class="column is-12"
      v-if="processedTransactions(currentCycle).length > 0"
    >
      <leaderboard-card
        :user="processedTransactions(currentCycle)[0].target"
        :transactions="processedTransactions(currentCycle)"
      ></leaderboard-card>
    </div>
    <div
      class="column is-6"
      v-if="processedTransactions(currentCycle).length > 1"
    >
      <leaderboard-card
        :user="processedTransactions(currentCycle)[1].target"
        :transactions="processedTransactions(currentCycle)"
      ></leaderboard-card>
    </div>
    <div
      class="column is-6"
      v-if="processedTransactions(currentCycle).length > 2"
    >
      <leaderboard-card
        :user="processedTransactions(currentCycle)[2].target"
        :transactions="processedTransactions(currentCycle)"
      ></leaderboard-card>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LeaderboardCard from '@/components/Users/LeaderboardCards.vue';
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
    LeaderboardCard,
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
export default class Leaderboard extends Vue {
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
    if (cycle) {
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
    return [];
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
}
</script>
