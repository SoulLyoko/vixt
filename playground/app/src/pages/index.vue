<script setup lang="ts">
const user = useUserStore()
const name = ref(user.savedName)

function go() {
  if (name.value)
    uni.navigateTo({ url: `/pages/hi?name=${encodeURIComponent(name.value)}` })
}
</script>

<template>
  <div>
    <view>
      <Icon icon="carbon:campsite" width="36px" />
    </view>

    <uni-link href="https://github.com/SoulLyoko/vixt" show-under-line="false" color="#333">
      Vixt
    </uni-link>

    <view text-sm op-75>
      Vixt App
    </view>

    <div py-4 />

    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <button text-sm btn m-3 :disabled="!name" @click="go">
      Go
    </button>
  </div>
</template>

<route type="home" lang="yaml">
meta:
  layout: home
</route>
