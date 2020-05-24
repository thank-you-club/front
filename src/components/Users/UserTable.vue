<template>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>
          <div class="buttons">
            <button
              class="button is-danger is-outlined"
              @click="$emit('remove', user)"
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
  @Prop({
    required: true,
  })
  public users!: IUser[];
}
</script>

<style lang="scss" scoped>
.button {
  min-width: 44px;
}
</style>
