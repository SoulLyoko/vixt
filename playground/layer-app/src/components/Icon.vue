<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()
const style = computed(() => {
  const { icon, ...query } = attrs
  const iconPath = (icon as string)?.replace(':', '/') ?? ''
  Object.keys(query).forEach((key) => {
    query[key] = encodeURIComponent(query[key] as any)
  })
  return {
    content: `url("https://api.iconify.design/${iconPath}.svg?${serialize(query)}")`,
  }
})

function serialize<T extends Record<string, any>>(data: T) {
  const res: string[] = []
  Object.keys(data).forEach((key) => {
    res.push(`${key}=${data[key]}`)
  })
  return res.join('&')
}
</script>

<template>
  <text :style="style" />
</template>
