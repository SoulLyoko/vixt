<template>
  <main
    px-4 py-10
    text="center gray-700 dark:gray-200"
  >
    <slot>
      <RouterView />
    </slot>
    <TheFooter />
    <div mx-auto mt-5 text-center text-sm opacity-50>
      [About Layout]
    </div>
  </main>
</template>
