<template>
  <div class="center-container">
    <VueDraggable
      v-model="editorStore.coms"
      group="serve-coms"
      item-key="id"
      @dragstart="handleDragStart"
    >
      <div
        v-for="(element, index) in editorStore.coms"
        ref="serve-com-item"
        :key="element.id"
        class="serve-com-item"
        :class="{ active: index === curComIndex }"
        @click="changeCurCom(index)"
      >
        <component
          :is="element.type"
          :status="element.status"
          :serialNum="serveNo[index]"
        ></component>
      </div>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import { computed, watch, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useServeNo } from '@/hooks/useServeNo.ts';
import eventBus from '@/utils/eventBus.ts';
import { useTemplateRef } from 'vue';

const editorStore = useEditorStore();
const curComIndex = computed(() => editorStore.currentComIndex);
let serveNo = useServeNo(editorStore.coms);
const componentsRefs = useTemplateRef<HTMLElement[]>('serve-com-item');

watch(
  () => editorStore.coms,
  () => {
    serveNo = useServeNo(editorStore.coms);
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

// 滚动行为控制，当选中组件时，滚动到组件的中心
const scrollToCenter = (index: number) => {
  nextTick(() => {
    // @ts-ignore 获取当前题目的dom元素
    const element = componentsRefs.value[index];
    console.log(index);
    // 判断当前元素是否是HTMLElement
    if (element instanceof HTMLElement) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
};
eventBus.on('scrollToCenter', scrollToCenter);
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
  border-bottom: 1px solid #eaeaea;

  &:hover,
  &.active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }
}
</style>
