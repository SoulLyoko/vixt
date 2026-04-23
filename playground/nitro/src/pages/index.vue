<script setup lang="ts">
const value = ref('test')
const { state } = useQuery({
  key: () => [value.value],
  enabled: () => !!value.value && !/\/\\/.test(value.value),
  query: () => $fetch(`/mock/${value.value}`),
})
</script>

<template>
  <div>
    <div>
      GET /mock/
      <input v-model="value" type="text">
    </div>
  </div>
  <div>state:</div>
  <code style="white-space: pre;">
    {{ state }}
  </code>
</template>
