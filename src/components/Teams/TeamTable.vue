<template>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="team in teams" :key="team._id">
        <td>{{ team.name }}</td>
        <td>
          <div class="buttons">
            <router-link
              class="button is-primary is-outlined"
              :to="{
                name: 'members',
                params: { teamId: team._id },
              }"
            >
              <i class="fas fa-edit" />
              <span class="is-hidden-mobile"> Members </span>
            </router-link>
            <router-link
              class="button is-info is-outlined"
              :to="{
                name: 'edit-team',
                params: { teamId: team._id },
              }"
              v-if="team.owner && team.owner._id === user._id"
            >
              <i class="fas fa-edit" />
              <span class="is-hidden-mobile"> Edit</span>
            </router-link>
            <button
              class="button is-danger is-outlined"
              @click="$emit('delete', team)"
              target="blank"
              v-if="team.owner && team.owner._id === user._id"
            >
              <i class="fas fa-times" />
              <span class="is-hidden-mobile"> Delete</span>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ITeam } from '@/models/Team';
@Component
export default class TeamTable extends Vue {
  private get user() {
    return this.$store.getters.getUser;
  }
  @Prop({
    required: true,
  })
  public teams!: ITeam[];
}
</script>

<style lang="scss" scoped>
.button {
  min-width: 44px;
}
</style>
