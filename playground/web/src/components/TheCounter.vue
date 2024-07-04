<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()

const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <div>
    <button class="dec" btn text-xs @click="dec()">
      -
    </button>
    {{ count }}
    <button class="inc" btn text-xs @click="inc()">
      +
    </button>

    <div>
      (TheCounter Component has been overridden)
    </div>
  </div>
</template>
