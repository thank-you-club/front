<template>
  <section class="content">
    <h1>
      Domain customization <span class="tag is-warning is-large">Beta</span>
    </h1>
    <form @submit.prevent="addDomain">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input"
            v-model="domain"
            type="text"
            placeholder="Domain name"
          />
        </div>
        <div class="control">
          <button
            :class="'button is-primary '.concat(isLoading ? 'is-loading' : '')"
            :disabled="isLoading || me.plan === 'free'"
          >
            Add domain
          </button>
        </div>
      </div>
    </form>
    <hr />
    <p v-if="me.plan !== 'free'">
      Please allow up to 48h for DNS to propagate. Click on verify afterwards.
    </p>
    <p v-if="me.plan == 'free'">
      This feature is available in the Regular pricing. Please upgrade to
      continue.
    </p>
    <table class="table is-stripped is-hoverable" v-if="me.plan !== 'free'">
      <thead>
        <tr>
          <td>Name</td>
          <td>Verified</td>
          <td>Host</td>
          <td>Value</td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody v-for="domain in myDomains" :key="domain._id">
        <tr>
          <td rowspan="3">{{ domain.domain }}</td>
          <td>
            <i
              :class="
                domain.mailCnameValidated
                  ? 'fas fa-check-circle has-text-primary'
                  : 'fas fa-times-circle has-text-danger'
              "
            />
          </td>
          <td>
            {{ domain.mailCnameHost }}<br />
            OR<br />
            {{
              domain.mailCnameHost
                ? domain.mailCnameHost.replace(domain.domain, '')
                : ''
            }}
          </td>
          <td>{{ domain.mailCnameValue }}</td>
          <td rowspan="3">
            <p
              v-if="
                domain.mailCnameValidated &&
                  domain.dkim1Validated &&
                  domain.dkim2Validated
              "
            >
              Verified
            </p>
            <button
              :class="
                'button is-primary '.concat(isLoading ? 'is-loading' : '')
              "
              type="button"
              @click.prevent="verifyDomain(domain)"
              :disabled="isLoading"
              v-else
            >
              Verify
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <i
              :class="
                domain.dkim1Validated
                  ? 'fas fa-check-circle has-text-primary'
                  : 'fas fa-times-circle has-text-danger'
              "
            />
          </td>
          <td>
            {{ domain.dkim1Host }}<br />
            OR<br />
            {{
              domain.dkim1Host
                ? domain.dkim1Host.replace(domain.domain, '')
                : ''
            }}
          </td>
          <td>{{ domain.dkim1Value }}</td>
        </tr>
        <tr>
          <td>
            <i
              :class="
                domain.dkim2Validated
                  ? 'fas fa-check-circle has-text-primary'
                  : 'fas fa-times-circle has-text-danger'
              "
            />
          </td>
          <td>
            {{ domain.dkim2Host }}<br />
            OR<br />
            {{
              domain.dkim2Host
                ? domain.dkim2Host.replace(domain.domain, '')
                : ''
            }}
          </td>
          <td>{{ domain.dkim2Value }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { me } from '@/graphql/auth';
import { getMyDomains } from '@/graphql/domains';
import { IUser } from '@/models/User';
import { IDomain } from '@/models/Domain';
const UserForm = () => import('@/components/Users/UserForm.vue');
@Component({
  components: {
    UserForm,
  },
  apollo: {
    me() {
      return { query: me() };
    },
    myDomains() {
      return { query: getMyDomains };
    },
  },
})
export default class Domains extends Vue {
  public me: IUser = {};
  public isLoading: boolean = false;
  public domain: string = '';
  public myDomains: IDomain[] = [];
  public async addDomain() {
    try {
      this.isLoading = true;
      await this.$store.dispatch('addDomain', { domain: this.domain });
      await this.$apollo.queries.myDomains.refetch();
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '400'
      ) {
        alert(
          'This domain is already used by another account. Please contact us if this is a mistake.',
        );
      } else {
        console.error(err);
        alert('An error has occured, please try again');
      }
    }
  }
  public async verifyDomain(domain: IDomain) {
    try {
      this.isLoading = true;

      await this.$store.dispatch('verifyDomain', domain);
      await this.$apollo.queries.myDomains.refetch();
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
      if (
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].message === '400'
      ) {
        alert(
          'Couldn\'t verify domain, make sure you\'ve written the correct values.',
        );
      } else {
        console.error(err);
        alert('An error has occured, please try again');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
tbody {
  border-bottom: 1px solid #dbdbdb;
}
</style>
