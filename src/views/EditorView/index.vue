<template>
  <div class="editor-view">
    <Header class="header" :is-editor="true"></Header>
    <div class="container" ref="container">
      <div class="left">
        <LeftSide></LeftSide>
      </div>
      <div class="center">
        <Center class="center-inner"></Center>
      </div>
      <div class="right">
        <RightSide></RightSide>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue';
import LeftSide from './LeftSide/index.vue';
import Center from './Center/index.vue';
import RightSide from './RightSide/index.vue';
import eventBus from '@/utils/eventBus.ts';
import { onMounted, useTemplateRef } from 'vue';
import { useEditorStore } from '@/stores/editorStore.ts';
import { computed, provide } from 'vue';
import { isPicLink, type PicLink } from '@/types/editProps.ts';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const surveyId = route.params.id;
const editorStore = useEditorStore();

// 在组件挂载后获取问卷数据
onMounted(async () => {
  if (surveyId) {
    await editorStore.getSurveyFromDB(Number(surveyId));
  } else {
    // 如果没有 surveyId，则重置 store
    editorStore.setStore();
  }
});

// 滚动行为控制，当添加新组件时，滚动到底部
const containerRef = useTemplateRef<HTMLDivElement>('container');
eventBus.on('scrollToBottom', () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior: 'smooth',
    });
  }
});

// ---------------------------------------
const currentMaterialCom = computed(() => editorStore.coms[editorStore.currentComIndex]);

// 使用依赖注入向后代组件提供更新状态的方法
const updateStatus = (configKey: string, payload?: number | string | boolean | PicLink) => {
  // @ts-ignore
  const CurProps = currentMaterialCom.value.status[configKey];
  switch (configKey) {
    case 'title':
    case 'desc':
    case 'titleColor':
    case 'descColor': {
      if (typeof payload !== 'string') {
        console.error('Invalid payload type for "title or desc or color". Expected string.');
        break;
      }
      editorStore.setTextStatus(CurProps, payload as string);
      break;
    }
    case 'options': {
      // payload 为 PicLink 类型时，是用于更新图片 options 状态的
      if (typeof payload === 'object' && isPicLink(payload as object)) {
        editorStore.setPicLinkByIndex(CurProps, payload);
        break;
      }
      if (typeof payload === 'number') {
        // 1. payload 是一个数字下标，用于删除选项
        editorStore.removeOptionStatus(CurProps, payload) || ElMessage.error('至少保留两个选项');
      } else {
        // 2. payload 不是数字下标（一般为 undefined），用于添加选项
        editorStore.addOptionStatus(CurProps);
      }
      break;
    }
    case 'position':
    case 'titleSize':
    case 'descSize':
    case 'titleWeight':
    case 'descWeight':
    case 'titleItalic':
    case 'descItalic': {
      // 居中设置 | 文字大小设置 | 文字粗细设置 | 文字倾斜设置
      if (typeof payload !== 'number') {
        console.error(
          'Invalid payload type for "position or size or weight or italic". Expected number.',
        );
        break;
      }
      editorStore.setOptionsStatus(CurProps, payload as number);
      break;
    }
    case 'type': {
      // 说明文字类型设置
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for "type". Expected number.');
        break;
      }
      editorStore.changeTextType(payload);
      break;
    }
  }
};

// 用于更新图片链接的方法
const getLink = (link: PicLink) => {
  updateStatus('options', link);
};

provide('updateStatus', updateStatus);
provide('getLink', getLink);
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.container {
  --container-height: calc(100vh - 50px - 40px);
  width: calc(100vw - 40px);
  height: var(--container-height);
  padding: 20px;
  background: url('@/assets/imgs/editor_background.png');
  position: fixed;
  top: 50px;
  overflow-y: auto;
}

.left,
.right {
  position: fixed;
  top: 70px;
  height: var(--container-height);
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow-y: auto;
}

.left {
  left: 20px;
  width: 300px;
}

.right {
  left: calc(100vw - 330px - 40px);
  width: 330px;
}

.center {
  width: calc(100vw - 40px - 300px - 330px - 40px);
  margin-left: 310px;
  margin-bottom: 150px;

  .center-inner {
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
}
</style>
