<template>
  <div class="edit-pannel">
    <div class="mb-20" v-for="(item, key) in com.status" :key="item.id">
      <component v-if="item.isShow" :is="item.editCom" :config-key="key" v-bind="item"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComStatus } from '@/types/common.ts';

const props = defineProps<{
  com: ComStatus;
}>();
</script>

<style scoped lang="scss">
.edit-pannel {
  font-size: var(--font-size-lg);
  color: var(--black);
}
</style>
