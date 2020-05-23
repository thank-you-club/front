<template>
  <table class="table is-fullwidth is-striped is-hoverable is-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="org in orgs" :key="org._id">
        <td>{{ org.name }}</td>
        <td>
          <div class="buttons">
            <router-link
              class="button is-primary is-outlined"
              :to="{
                name: 'edit-org',
                params: { orgId: org._id },
              }"
            >
              <i class="fas fa-edit" />
              <span class="is-hidden-mobile"> Edit</span>
            </router-link>
            <button
              class="button is-danger is-outlined"
              @click="$emit('delete', org)"
              target="blank"
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
import { IOrg } from '@/models/Org';
@Component
export default class OrgTable extends Vue {
  @Prop({
    required: true,
  })
  public orgs!: IOrg[];
}
</script>

<style lang="scss" scoped>
.button {
  min-width: 44px;
}
</style>
