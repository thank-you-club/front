<template>
  <div class="columns is-marginless">
    <section class="column is-3 is-hidden-mobile">
      <side-menu-component :orgs="orgs" />
    </section>
    <section class="column is-9">
      <transition name="slide-fade">
        <router-view :key="$route.fullPath" />
      </transition>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideMenuComponent from '@/components/Shared/SideMenu.vue';
import { getOrgs } from '../graphql/orgs';
import { IOrg } from '../models/Org';
@Component({
  components: { SideMenuComponent },
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
export default class AuthedBase extends Vue {
  public orgs: IOrg[] = [];
}
</script>
