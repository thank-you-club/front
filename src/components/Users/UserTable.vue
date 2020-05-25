<template>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th v-if="transactions.length > 0">Points</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" :key="u._id">
        <td>{{ u.firstName }} {{ u.lastName }}</td>
        <td v-if="transactions.length > 0">
          {{ userPoints(u) }}
        </td>
        <td>
          <div class="buttons">
            <button
              class="button is-primary is-outlined"
              @click="$emit('endorse', u)"
              target="blank"
              v-if="user._id !== u._id && transactions.length > 0"
            >
              <i class="fas fa-times" />
              <span class="is-hidden-mobile"> Endorse</span>
            </button>
            <button
              class="button is-danger is-outlined"
              @click="$emit('remove', u)"
              target="blank"
              v-if="owner._id === user._id"
            >
              <i class="fas fa-times" />
              <span class="is-hidden-mobile"> Remove</span>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '@/models/User';
import { ITransaction } from '@/models/Transaction';
@Component
export default class UserTable extends Vue {
  private get user() {
    return this.$store.getters.getUser;
  }
  @Prop({
    required: true,
  })
  public users!: IUser[];
  @Prop({
    required: true,
  })
  public owner!: IUser[];
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
.button {
  min-width: 44px;
}
</style>
