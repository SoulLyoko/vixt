<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')
const user = useUserStore()

watchEffect(() => {
  user.setNewName(route.params.name as string)
})
</script>

<template>
  <div>
    <div>
      Hi, {{ user.savedName }}
    </div>

    <div text-sm op-75>
      Dynamic route!
    </div>

    <div v-if="user.otherNames.length" mt-4 text-sm>
      <div op-75>
        aka:
      </div>
      <div v-for="otherName in user.otherNames" :key="otherName">
        <RouterLink :to="`/hi/${otherName}`" replace>
          {{ otherName }}
        </RouterLink>
      </div>
    </div>

    <button m-3 btn text-sm @click="router.back()">
      Back
    </button>

    <TheCounter :initial="user.otherNames.length" />
  </div>
</template>
