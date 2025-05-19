<template>
  <div class="serve-type-view">
    <ServeComGroup
      v-for="(group, index) in ServeComList"
      :key="index"
      v-bind="group"
      class="mb-30"
    ></ServeComGroup>
  </div>
</template>

<script setup lang="ts">
import ServeComGroup from '@/components/Editor/ServeComGroup.vue';
import { ServeComList } from '@/configs/ServeGroupConfig.ts';
</script>

<style scoped lang="scss">
.serve-type-view {
  padding: 20px;
}
</style>
