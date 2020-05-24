<template>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th v-if="owner._id === user._id">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in users" :key="u._id">
        <td>{{ u.firstName }} {{ u.lastName }}</td>
        <td v-if="owner._id === user._id">
          <div class="buttons">
            <button
              class="button is-danger is-outlined"
              @click="$emit('remove', u)"
              target="blank"
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
}
</script>

<style lang="scss" scoped>
.button {
  min-width: 44px;
}
</style>
