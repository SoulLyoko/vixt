<script setup lang="ts">
defineProps<{ name?: string }>()
</script>

<template>
  <view :class="{ dark: isDark }" h-full>
    <view text="center gray-700 dark:gray-200" box-border h-full bg-light px-4 py-10 dark-bg-dark>
      <slot />
      <TheFooter />
      <view mx-auto mt-5 text-center text-sm opacity-50>
        [{{ name }} Layout]
      </view>
    </view>
  </view>
</template>
