<script setup lang="ts">
// @ts-ignore
import { showToast } from '@/uni_modules/uts-toast'

const user = useUserStore()
const name = ref(user.savedName)

function go() {
  if (name.value)
    uni.navigateTo({ url: `/pages/hi?name=${encodeURIComponent(name.value)}` })
}

function toast() {
  showToast({ message: 'Vixt App' })
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

    <view text-sm op-75 @click="toast">
      {{ ENV.VITE_APP_NAME }}
    </view>

    <view py-4 />

    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <view>
      <button :disabled="!name" text-sm btn m-3 @click="go">
        Go
      </button>
    </view>
  </view>
</template>

<route type="home" lang="yaml">
meta:
  layout: home
</route>
