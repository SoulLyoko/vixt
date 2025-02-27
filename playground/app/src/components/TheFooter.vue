<script setup lang="ts">
</script>

<template>
  <view flex="~ gap-4" justify-center mt-6 text-xl>
    <navigator icon-btn url="/pages/index" title="Home">
      <Icon icon="carbon:campsite" width="20px" />
    </navigator>

    <view icon-btn title="ToggleDark" @click="toggleDark()">
      <Icon :icon="isDark ? 'carbon:sun' : 'carbon:moon'" width="20px" />
    </view>

    <uni-link icon-btn href="https://github.com/SoulLyoko/vixt" title="GitHub">
      <Icon icon="carbon:logo-github" width="20px" />
    </uni-link>

    <navigator icon-btn url="/pages/about" title="About">
      <Icon icon="carbon:dicom-overlay" width="20px" />
    </navigator>
  </view>
</template>
