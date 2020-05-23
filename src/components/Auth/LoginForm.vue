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
          required
        />
      </div>
    </div>
    <div class="field">
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
    <div class="field">
      <button class="button is-primary is-fullwidth">Login</button>
      <router-link :to="{ name: 'reset' }">
        <button class="button is-default is-fullwidth">
          I forgot my password
        </button>
      </router-link>
    </div>
  </form>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUser } from '@/models/User';
@Component
export default class LoginForm extends Vue {
  public user: IUser = {
    password: '',
  };
  public submit(e: Event) {
    e.preventDefault();
    this.$emit('submit', this.user);
  }
}
</script>

<style lang="scss" scoped>
.button {
  margin-top: 8px;
}
</style>