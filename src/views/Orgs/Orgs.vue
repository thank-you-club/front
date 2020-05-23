<template>
  <section class="columns is-multiline">
    <div class="column is-12">
      <router-link :to="{ name: 'new-org' }">
        <button
          class="button is-primary is-pulled-right"
          v-if="orgs.length > 0"
        >
          New Org
        </button>
      </router-link>
    </div>
    <div class="column is-12" v-if="orgs.length > 0">
      <org-table :orgs="orgs" @delete="deleteOrg" />
    </div>
    <div
      class="column is-12 has-text-centered has-margin-top"
      v-if="!isLoading && orgs.length === 0"
    >
      <p class="is-size-4">No orgs yet? No problem!</p>
      <p class="is-size-5">Do it now!</p>
      <router-link :to="{ name: 'new-org' }">
        <button class="button is-primary has-margin-top">New Org</button>
      </router-link>
    </div>
    <div class="column is-12 has-text-centered" v-if="isLoading">
      <spinner />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrgTable from '@/components/Orgs/OrgTable.vue';
import Spinner from '@/components/Shared/Spinner.vue';
import { IOrg } from '@/models/Org';

import { getOrgs } from '@/graphql/orgs';

@Component({
  components: {
    OrgTable,
    Spinner,
  },
  apollo: {
    orgs: {
      query: getOrgs,
      loadingKey: 'isLoading',
      watchLoading(isLoading) {
        this.isLoading = isLoading;
      },
    },
  },
})
export default class Orgs extends Vue {
  public orgs: IOrg[] = [];
  public isLoading: boolean = true;
  public API_URL = process.env.VUE_APP_API_URL;
  public async deleteOrg(org: IOrg) {
    const promptInput = prompt('Are you sure? To confirm write DETELE');
    if (promptInput === 'DELETE') {
      await this.$store.dispatch('deleteOrg', org);
      await this.$apollo.queries.orgs.refetch();
    }
  }
}
</script>

<style lang="scss" scoped>
.has-margin-top {
  margin-top: 48px;
}
</style>
