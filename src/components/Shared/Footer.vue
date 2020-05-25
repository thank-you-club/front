<template>
  <footer class="columns is-multiline">
    <!-- <div
      class="column is-12 has-text-centered has-background-white"
      style="z-index: 10;"
    >
      Find us on social media |
      <a href="https://twitter.com/chillshiftiva"
        ><i class="fab fa-twitter-square"
      /></a>
      <a href="https://www.linkedin.com/company/chillshiftiva"
        ><i class="fab fa-linkedin"
      /></a>
      <a href="https://www.facebook.com/Iva-docs-112318873777676"
        ><i class="fab fa-facebook-square"
      /></a>
      <a href="https://www.youtube.com/channel/UCuP3lI0LHQEV9d3yHCKePIA"
        ><i class="fab fa-youtube-square"
      /></a>
    </div> -->
    <div class="column is-12 has-text-centered" style="z-index: 10;">
      Thank-you.club made with <i class="fa fa-heart has-text-danger" /> by
      Khaled Romdhane
      <!-- <a href="/privacy-policies">Privacy policies</a> |
      <a href="/terms">Terms of service</a> -->
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FooterComponent extends Vue {}
</script>

<style lang="scss" scoped>
.columns.is-multiline {
  margin-top: 0px;
}
</style>
