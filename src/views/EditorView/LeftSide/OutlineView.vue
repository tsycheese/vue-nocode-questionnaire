<template>
  <div class="outline-view">
    <VueDraggable
      v-model="editorStore.coms"
      group="outline-items"
      item-key="id"
      @dragstart="handleDragStart"
    >
      <template v-for="(element, index) in editorStore.coms" :key="element.id">
        <div
          v-if="surveyNo[index] !== null"
          class="outline-item"
          :class="{ active: index === curComIndex }"
          @click="changeCurCom(index)"
        >
          {{ surveyNo[index] }}. {{ element.status.title.status }}
        </div>
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import { computed, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useSurveyNo } from '@/hooks/useSurveyNo';
import eventBus from '@/utils/eventBus.ts';

const editorStore = useEditorStore();
const curComIndex = computed(() => editorStore.currentComIndex);
let surveyNo = useSurveyNo(editorStore.coms);

watch(
  () => editorStore.coms,
  () => {
    surveyNo = useSurveyNo(editorStore.coms);
  },
  {
    deep: true,
  },
);

const changeCurCom = (index: number) => {
  editorStore.setCurrentComIndex(index);
  eventBus.emit('scrollToCenter', index);
};
const handleDragStart = (e: DragEvent) => {
  // 清除当前选中的组件索引
  editorStore.setCurrentComIndex(-1);
};
</script>

<style scoped lang="scss">
.outline-view {
  padding: 20px;
}

.outline-item {
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s;

  &.active {
    color: var(--font-color);
    background-color: var(--background-color);
    transform: scale(1.01);
  }
}
</style>
