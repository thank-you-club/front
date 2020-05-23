<template>
  <div class="columns is-marginless">
    <section class="column is-3 is-hidden-mobile">
      <side-menu-component />
    </section>
    <section class="column is-9">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SideMenuComponent from '@/components/Shared/SideMenu.vue';
@Component({
  components: { SideMenuComponent },
})
export default class AuthedBase extends Vue {}
</script>
