<script setup lang="ts">
const linkRef = ref()
</script>

<template>
  <view flex="~ gap-4" mt-6 justify-center text-xl>
    <navigator icon-btn url="/pages/index" title="Home">
      <Icon icon="carbon:campsite" width="20px" />
    </navigator>

    <view icon-btn title="ToggleDark" @click="toggleDark()">
      <Icon :icon="isDark ? 'carbon:sun' : 'carbon:moon'" width="20px" />
    </view>

    <view icon-btn @click="linkRef?.openURL()">
      <Icon icon="carbon:logo-github" width="20px" />
      <uni-link ref="linkRef" href="https://github.com/SoulLyoko/vixt" title="GitHub" hidden />
    </view>

    <navigator icon-btn url="/pages/about" title="About">
      <Icon icon="carbon:dicom-overlay" width="20px" />
    </navigator>
  </view>
</template>
