<script setup lang="ts">
const router = useRouter()
const route = useRoute('hi-name')
const user = useUserStore()

watchEffect(() => {
  user.setNewName(route.params.name)
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

    <div v-if="user.otherNames.length" text-sm mt-4>
      <div op-75>
        aka:
      </div>
      <div v-for="otherName in user.otherNames" :key="otherName">
        <RouterLink :to="`/hi/${otherName}`" replace>
          {{ otherName }}
        </RouterLink>
      </div>
    </div>

    <button text-sm btn m-3 @click="router.back()">
      Back
    </button>

    <TheCounter :initial="user.otherNames.length" />
  </div>
</template>
