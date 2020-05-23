<template>
  <section class="content">
    <!-- <form>
      <editor-component :content="content" />
    </form> -->
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Email extends Vue {
  public content = '';
}
</script>
