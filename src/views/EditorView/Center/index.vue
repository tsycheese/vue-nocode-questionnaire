<template>
  <div class="center-container">
    <div
      class="serve-com-item"
      :class="{ active: curComIndex === index }"
      v-for="(com, index) in editorStore.coms"
      :key="com.id"
      @click="changeCurCom(index)"
    >
      <component :is="com.type" :status="com.status" :serialNum="1"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import { computed } from 'vue';

const editorStore = useEditorStore();
const curComIndex = computed(() => editorStore.currentComIndex);

const changeCurCom = (index: number) => {
  editorStore.setCurrentComIndex(index);
};
</script>

<style scoped lang="scss">
.center-container {
  padding: 20px;
  overflow-y: auto;
}

.serve-com-item {
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover,
  &.active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.01);
  }
}
</style>
