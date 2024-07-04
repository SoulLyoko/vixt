<script setup lang="ts">
const props = defineProps<{
  initial: number
}>()

const { count, inc, dec } = useCounter(props.initial)
</script>

<template>
  <view>
    <button class="dec" btn text-xs @click="dec()">
      -
    </button>
    {{ count }}
    <button class="inc" btn text-xs @click="inc()">
      +
    </button>

    <view>
      (TheCounter Component has been overridden)
    </view>
  </view>
</template>
