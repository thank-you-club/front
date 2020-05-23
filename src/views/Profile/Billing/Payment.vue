<template>
  <section class="content">
    <h1>Purchasing {{ plan }} plan</h1>
    <div class="box"><Stripe :plan="$route.params.plan" /></div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Stripe from '@/components/Billing/Stripe.vue';
import { IUser } from '../../../models/User';
import { PlanNames, Plans } from '../../../constants/Plan';
@Component({
  components: {
    Stripe,
  },
})
export default class Base extends Vue {
  get user(): IUser {
    return this.$store.getters.getUser;
  }
  get plan() {
    // @ts-ignore
    return PlanNames[Plans[this.$route.params.plan]];
  }
}
</script>
