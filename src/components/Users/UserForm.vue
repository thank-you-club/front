<template>
  <form @submit="submit">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          name="email"
          type="email"
          v-model="user.email"
          placeholder="Email"
          :required="!isEmailDisabled"
          :disabled="isEmailDisabled"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">First name</label>
      <div class="control">
        <input
          class="input"
          name="firstname"
          type="text"
          v-model="user.firstName"
          placeholder="First name"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Last name</label>
      <div class="control">
        <input
          class="input"
          name="lastname"
          type="text"
          v-model="user.lastName"
          placeholder="Last name"
          required
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Photo URL</label>
      <div class="control">
        <input
          class="input"
          name="photoUrl"
          type="text"
          v-model="user.photoUrl"
          placeholder="Url for your photo (Use your slack photo)"
          required
        />
      </div>
    </div>
    <div class="field" v-if="hasPassword === true">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          name="password"
          type="password"
          v-model="user.password"
          placeholder="Password"
          required
        />
      </div>
    </div>
    <div class="field" v-if="hasPassword === true">
      <label class="label">Confirm your password</label>
      <div class="control">
        <input
          class="input"
          name="confirmpassword"
          type="password"
          v-model="confirm"
          placeholder="Confirm password"
          required
        />
      </div>
      <p class="help is-danger" v-if="isConfirmationDiferent === true">
        Both password must match!
      </p>
    </div>
    <div class="field" v-if="hasCheckboxes === true">
      <label class="checkbox">
        <input
          type="checkbox"
          v-model="user.isAgreeingToTermsOfService"
          required
        />
        I agree to the
        <a href="/terms" target="_blank">terms of service</a>
      </label>
    </div>
    <div class="field" v-if="hasCheckboxes === true">
      <label class="checkbox">
        <input type="checkbox" v-model="user.isSubscribedToNewsletter" />
        I agree to receiving the Iva newsletter at most once a month
      </label>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button
          :class="`button is-primary ${isLoading ? 'is-loading' : ''}`"
          type="submit"
        >
          {{ confirmationMessage }}
        </button>
      </div>
      <div class="control" v-if="hasBackButton">
        <button
          :class="`button ${isLoading ? 'is-loading' : ''}`"
          type="button"
        >
          Back
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '@/models/User';
@Component
export default class UserForm extends Vue {
  get isConfirmationDiferent() {
    return this.user.password !== this.confirm && this.confirm.length > 0;
  }
  public confirm: string = '';

  @Prop() public user!: IUser;

  @Prop() public confirmationMessage!: string;
  @Prop({
    default: false,
  })
  public isEmailUsed!: boolean;

  @Prop({
    default: false,
  })
  public isEmailDisabled!: boolean;

  @Prop({
    default: true,
  })
  public hasPassword!: boolean;

  @Prop({
    default: false,
  })
  public hasBackButton!: boolean;

  @Prop({
    default: false,
  })
  public isLoading!: boolean;

  @Prop({
    default: false,
  })
  public hasCheckboxes!: boolean;
  public submit(e: Event) {
    e.preventDefault();
    if (this.hasPassword === false || this.user.password === this.confirm) {
      this.$emit('submit', this.user);
    } else if (this.isConfirmationDiferent) {
      this.$emit('error', 400);
    } else {
      this.$emit('error', 404);
    }
  }
}
</script>
