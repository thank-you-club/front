<template>
  <section class="container">
    <div class="hero">
      <div class="hero-body">
        <form @submit="submit">
          <div class="field">
            <input class="input" v-model="email" placeholder="Email" />
          </div>
          <div class="field has-text-centered">
            <button class="button is-primary is-fullwidth">Send me reset instructions</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Login extends Vue {
  public email: string = '';
  public async submit(e: Event) {
    e.preventDefault();
    try {
      const data = await this.$store.dispatch('generateResetToken', this.email);
      this.$router.push({ name: 'reset-email-sent' });
    } catch (err) {
      console.error(err);
    }
  }
}
</script>