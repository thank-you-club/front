<template>
  <section class="container">
    <div class="hero">
      <div class="hero-body content">
        <p>I sent you an email, you can continue through you email box!</p>
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
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
}
</script>