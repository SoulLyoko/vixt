<script setup lang="ts">
import { toggleDark } from '#/layers/layer-shared/src/composables/dark'
</script>

<template>
  <nav flex="~ gap-4" justify-center mt-6 text-xl>
    <RouterLink icon-btn to="/" title="Home">
      <Icon icon="carbon:campsite" />
    </RouterLink>

    <button icon-btn title="ToggleDark" @click="toggleDark()">
      <Icon :icon="isDark ? 'carbon:sun' : 'carbon:moon'" />
    </button>

    <a icon-btn rel="noreferrer" href="https://github.com/SoulLyoko/vixt" target="_blank" title="GitHub">
      <Icon icon="carbon:logo-github" />
    </a>

    <RouterLink icon-btn to="/about" title="About">
      <Icon icon="carbon:dicom-overlay" />
    </RouterLink>
  </nav>
</template>
