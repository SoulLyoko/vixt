<script setup lang="ts">
const user = useUserStore()

const { query } = useQuery()

watchEffect(() => {
  user.setNewName(query.value.name)
})
</script>

<template>
  <view>
    <view>
      Hi, {{ user.savedName }}
    </view>

    <view text-sm op-75>
      Dynamic route!
    </view>

    <view v-if="user.otherNames.length" text-sm mt-4>
      <view op-75>
        aka:
      </view>
      <view v-for="otherName in user.otherNames" :key="otherName">
        <navigator :url="`/pages/hi?name=${otherName}`" open-type="redirect">
          {{ otherName }}
        </navigator>
      </view>
    </view>

    <view>
      <navigator text-sm btn m-3 open-type="navigateBack">
        Back
      </navigator>
    </view>

    <TheCounter :initial="user.otherNames.length" />
  </view>
</template>
