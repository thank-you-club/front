<template>
  <section>
    <org-form
      :org="org"
      :isLoading="isLoading"
      :plan="user.plan"
      @submit="submit"
      @back="back"
    />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import OrgForm from '@/components/Orgs/OrgForm.vue';
import { getOrgs, getOrgById } from '@/graphql/orgs';
import { IOrg } from '@/models/Org';
@Component({
  components: {
    OrgForm,
  },
  apollo: {
    org() {
      return {
        query: getOrgById,
        skip: true,
        variables: {
          _id: 'init',
        },
      };
    },
  },
})
export default class Orgs extends Vue {
  public org: IOrg = {};
  public isLoading = false;
  public async submit() {
    try {
      this.isLoading = true;
      const data = await this.$store.dispatch('updateOrg', this.org);
      this.$router.push({
        name: 'orgs',
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
    this.$router.push({ name: 'orgs' });
  }
  public async mounted() {
    this.isLoading = true;
    this.$apollo.queries.org.setVariables({
      _id: this.$route.params.orgId,
    });
    this.$apollo.queries.org.skip = false;
    await this.$apollo.queries.org.refetch();
    this.isLoading = false;
  }
  get user() {
    return this.$store.getters.getUser;
  }
}
</script>
