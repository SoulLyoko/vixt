<script setup lang="ts">
const user = useUserStore()
const name = ref(user.savedName)

function go() {
  if (name.value)
    uni.navigateTo({ url: `/pages/hi?name=${encodeURIComponent(name.value)}` })
}
</script>

<template>
  <view>
    <view>
      <Icon icon="carbon:campsite" width="36px" />
    </view>

    <uni-link href="https://github.com/SoulLyoko/vixt" :show-under-line="false" color="#333">
      Vixt
    </uni-link>

    <view text-sm op-75>
      Vixt App
    </view>

    <view py-4 />

    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <view mx-auto my-3 w-10>
      <u-button type="primary" size="small" :disabled="!name" @click="go">
        Go
      </u-button>
    </view>
  </view>
</template>

<route type="home" lang="yaml">
meta:
  layout: home
</route>
