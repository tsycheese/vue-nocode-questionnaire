<template>
  <div class="center-container">
    <div class="serve-com-item" v-for="com in editorStore.coms" :key="com.id">
      <component :is="com.type" :status="com.status" :serialNum="1"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';

const editorStore = useEditorStore();
</script>

<style scoped lang="scss">
.center-container {
  padding: 20px;
  overflow-y: auto;
}
</style>
