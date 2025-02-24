<template>
  <div text-center>
    <h3>Home</h3>
  </div>
  <div>
    <strong>This page should not be visited.</strong>
    <ul>
      Please check the rewriting rules below:
      <li>path `/index/index` can be rewritten by `/index/index` and `/index`.</li>
      <li>path `/index` can be rewritten by `/index`, but can not be rewritten by `/index/index`.</li>
    </ul>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
