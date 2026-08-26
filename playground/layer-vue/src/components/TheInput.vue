<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <input
    v-model="modelValue"
    id="input"
    type="text"
    class="bg-transparent min-h-8"
    p="x-4 y-2"
    outline="none active:none"
    border="~ solid gray-200 rounded dark:gray-700"
    text-center
    m-auto
    w-250px
    :placeholder="placeholder"
  />
</template>
