<script setup lang="ts">
import DefaultLayout from '#/layers/layer-vue/src/layouts/default.vue'

defineOptions({ inheritAttrs: false })
</script>

<template>
  <DefaultLayout>
    <slot />
  </DefaultLayout>
</template>
