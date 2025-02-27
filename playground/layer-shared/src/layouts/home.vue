<template>
  <main
    px-4 py-10
    text="center gray-700 dark:gray-200"
  >
    <slot>
      <RouterView />
    </slot>
    <TheFooter />
    <div text-center mx-auto mt-5 text-sm opacity-50>
      [Home Layout]
    </div>
  </main>
</template>
