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
  <div>
    <Icon icon="carbon:campsite" m-auto width="36px" />

    <a href="https://github.com/SoulLyoko/vixt" target="_blank">
      Vixt
    </a>

    <div text-sm op-75>
      Vixt Web
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
