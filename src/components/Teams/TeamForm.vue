<template>
  <form @submit="submit">
    <div class="box">
      <h5 class="title is-5">Team Information</h5>
      <div id="teamName" class="field">
        <label class="label">
          Team name
          <strong class="has-text-danger">*</strong>
        </label>
        <div class="control has-icons-right">
          <input
            :class="'input'.concat(hasErrorInName ? ' is-danger' : '')"
            type="text"
            v-model="team.name"
            placeholder="Team name"
            :disabled="isLoading"
          />
          <span class="icon is-small is-right" v-if="hasErrorInName">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger" v-if="hasErrorInName">
          I can't find it without a name later sir!
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <button
          :class="`button is-fullwidth ${isLoading ? 'is-loading' : ''}`"
          type="button "
          @click="$emit('back')"
        >
          Cancel all changes
        </button>
      </div>
      <div class="column is-6">
        <button
          :class="
            `button is-primary is-fullwidth ${isLoading ? 'is-loading' : ''}`
          "
        >
          {{ submitLabel }}
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ITeam } from '@/models/Team';
import { me } from '../../graphql/auth';
declare const Shepherd: any;
@Component({
  apollo: {
    me() {
      return { query: me(), skip: true };
    },
  },
})
export default class TeamForm extends Vue {

  get hasErrorInName() {
    return (
      this.hasSubmittedOne && (!this.team.name || this.team.name.length === 0)
    );
  }
  public hasSubmittedOne: boolean = false;
  public errorInName: string = '';
  public errorInFile: string = '';
  public hasIntegrationsOpen = false;
  public hasMappersOpen = false;

  @Prop({
    required: true,
  })
  public team!: ITeam;
  @Prop({
    required: false,
    default: 'Submit',
  })
  public submitLabel!: string;
  @Prop({
    required: false,
    default: true,
  })
  public isLoading!: boolean;

  @Prop({
    required: true,
  })
  public plan!: boolean;
  public submit(e: Event) {
    e.preventDefault();
    this.hasSubmittedOne = true;
    if (!this.hasErrorInName) {
      this.$emit('submit');
    }
  }
}
</script>

<style scoped>
.is-pointer {
  cursor: pointer;
}
</style>
