<template>
  <section class="container">
    <form @submit="submit">
      <div class="field">
        <label class="label">New password</label>
        <div class="control">
          <input
            class="input"
            name="password"
            type="password"
            v-model="password"
            placeholder="New password"
            required
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm password</label>
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
        <p
          class="help is-danger"
          v-if="confirm.length > 0 && isConfirmationDiferent === true"
        >Both password must match!</p>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button
            :class="`button is-primary ${isLoading ? 'is-loading' : ''}`"
            type="submit"
          >Change my password</button>
        </div>
      </div>
    </form>
  </section>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  public confirm: string = '';
  public password: string = '';
  public isLoading = false;
  public async submit(e: Event) {
    try {
      e.preventDefault();
      this.isLoading = true;
      await this.$store.dispatch('resetPassword', {
        password: this.password,
        query: this.$route.query,
      });
      alert('Your password was successfully changed');
      this.$router.push({ name: 'login' });
    } catch (err) {
      console.error(err);
    }
    this.isLoading = false;
  }
  get isConfirmationDiferent() {
    return this.confirm !== this.password;
  }
}
</script>