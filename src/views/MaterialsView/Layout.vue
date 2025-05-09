<template>
  <div class="layout">
    <div class="left">
      <slot />
    </div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.layout {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 0 var(--border-radius-base) var(--border-radius-base) var(--border-radius-base);
  height: calc(100vh - 150px);
}

.left {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  column-gap: 10px;
  width: 175px;
  padding: 20px;
}

.center {
  flex: 1;
  padding: 20px;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
}

.right {
  width: 320px;
}
</style>
