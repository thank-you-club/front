<template>
  <div class="columns">
    <div class="column is-narrow">
      <figure class="image is-128x128">
        <img :src="user.photoUrl" :alt="user.firstName + ' ' + user.lastName" />
      </figure>
    </div>
    <div class="column">
      <h3>{{ user.firstName + ' ' + user.lastName }}</h3>
      <span class="title is-1">{{ userPoints(user) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '@/models/User';
import { ITransaction } from '../../models/Transaction';
@Component
export default class LeaderboardCard extends Vue {
  @Prop()
  public user!: IUser;

  @Prop({
    required: false,
    default: [],
  })
  public transactions!: ITransaction[];

  public userPoints(user: IUser): number {
    return this.transactions
      .filter((e) => e.target && e.target._id === user._id)
      .reduce((p, c) => p + (c.value ? c.value : 0), 0);
  }
}
</script>

<style lang="scss" scoped>
.columns {
  height: 320px;
}
</style>