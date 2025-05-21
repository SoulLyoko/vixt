<script setup lang="ts">
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div data-testid="page-index">
    <Icon icon="carbon:campsite" width="36px" m-auto />

    <a href="https://github.com/SoulLyoko/vixt" target="_blank">
      Vixt
    </a>

    <div text-sm op-75>
      {{ ENV.VITE_APP_NAME }}
    </div>

    <div py-4 />

    <TheInput v-model="name" placeholder="What's your name?" autocomplete="false" @keydown.enter="go" />

    <div>
      <button :disabled="!name" text-sm btn m-3 @click="go">
        Go
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
