<script setup lang="ts">
import { Icon as Iconify } from '@iconify/vue'

defineProps<{ icon?: string }>()
</script>

<template>
  <Iconify :icon="icon ?? ''" />
</template>
