<template>
  <div class="material-header">
    <h2 class="title">
      <span>1.</span>
      <span>Watching the moon</span>
    </h2>
    <div class="desc">我明白</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
h2 {
  font-size: 22px;
  font-weight: normal;

  & > span {
    margin-right: 5px;
  }
}

.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}
</style>
