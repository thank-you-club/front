<template>
    <transition name="slide-fade">
        <router-view/>
    </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Base extends Vue {}
</script>
