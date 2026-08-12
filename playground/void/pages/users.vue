<script setup lang="ts">
import type { Props } from './users.server'

import { Link } from '@void/vue'
import { ref } from 'vue'

const props = defineProps<Props>()

const query = ref(props.query ?? {})
</script>

<template>
  <ul>
    <input v-model="query.name">
    <Link href="/users" :data="query" view-transition>
      query
    </Link>
    <li v-for="user in users" :key="user.name">
      {{ user.name }}
    </li>
  </ul>
</template>
