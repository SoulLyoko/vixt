<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    type="text"
    p="x-4 y-2"
    w="250px"
    text="center"
    bg="transparent"
    border="~ solid gray-200 rounded dark:gray-700"
    outline="none active:none"
    min-h-8
    m-auto
  >
</template>
