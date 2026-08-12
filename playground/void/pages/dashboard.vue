<script setup lang="ts">
defineProps<{
  title?: boolean
}>()
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
  </main>
</template>
