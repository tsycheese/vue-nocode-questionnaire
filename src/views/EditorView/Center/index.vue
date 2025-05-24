<template>
  <div class="center-container">
    <VueDraggable
      v-model="editorStore.coms"
      group="survey-coms"
      item-key="id"
      @dragstart="handleDragStart"
    >
      <div
        v-for="(element, index) in editorStore.coms"
        ref="survey-com-item"
        :key="element.id"
        class="survey-com-item"
        :class="{ active: index === curComIndex }"
        @click="changeCurCom(index)"
      >
        <div class="close" @click="handleRemove(index)">
          <el-icon>
            <Close />
          </el-icon>
        </div>
        <component
          :is="element.type"
          :status="element.status"
          :serialNum="surveyNo[index]"
        ></component>
      </div>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import { computed, watch, nextTick } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useSurveyNo } from '@/hooks/useSurveyNo';
import eventBus from '@/utils/eventBus.ts';
import { useTemplateRef } from 'vue';
import { Close } from '@element-plus/icons-vue';

const editorStore = useEditorStore();
const curComIndex = computed(() => editorStore.currentComIndex);
let surveyNo = useSurveyNo(editorStore.coms);
const componentsRefs = useTemplateRef<HTMLElement[]>('survey-com-item');

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
const handleRemove = (index: number) => {
  editorStore.removeCom(index);
};

// 滚动行为控制，当选中组件时，滚动到组件的中心
const scrollToCenter = (index: number) => {
  nextTick(() => {
    // @ts-ignore 获取当前题目的dom元素
    const element = componentsRefs.value[index];
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

.survey-com-item {
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 1px solid #eaeaea;
  position: relative;

  &:hover,
  &.active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }

  & .close {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    transform: translateX(40%) translateY(-40%);
    border-radius: 50%;
    background-color: #f56c6c;
    color: #fff;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    cursor: pointer;
  }

  &.active .close {
    display: flex;
  }
}
</style>
