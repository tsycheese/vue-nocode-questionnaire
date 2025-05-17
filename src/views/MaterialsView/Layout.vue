<template>
  <div class="layout">
    <!-- 选择具体的业务组件 -->
    <div class="left">
      <slot />
    </div>
    <!-- 显示对应的业务组件 -->
    <div class="center">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :status="currentMaterialCom.status" :serialNum="1" />
      </RouterView>
    </div>
    <!-- 编辑面板 -->
    <div class="right">
      <EditPanel :com="currentMaterialCom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { useMaterialStore } from '@/stores/materialStore.ts';
import EditPanel from '@/components/ServeComs/Materials/EditItems/EditPanel.vue';
import { ElMessage } from 'element-plus';
import { isPicLink, type PicLink } from '@/types/editProps.ts';

const materialStore = useMaterialStore();
const currentMaterialCom = computed(() => materialStore.coms[materialStore.currentMaterialCom]);

// 使用依赖注入向后代组件提供更新状态的方法
const updateStatus = (configKey: string, payload?: number | string | boolean | PicLink) => {
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
      materialStore.setTextStatus(CurProps, payload as string);
      break;
    }
    case 'options': {
      // payload 为 PicLink 类型时，是用于更新图片 options 状态的
      if (typeof payload === 'object' && isPicLink(payload as object)) {
        materialStore.setPicLinkByIndex(CurProps, payload);
        break;
      }
      if (typeof payload === 'number') {
        // 1. payload 是一个数字下标，用于删除选项
        materialStore.removeOptionStatus(CurProps, payload) || ElMessage.error('至少保留两个选项');
      } else {
        // 2. payload 不是数字下标（一般为 undefined），用于添加选项
        materialStore.addOptionStatus(CurProps);
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
      materialStore.setOptionsStatus(CurProps, payload as number);
      break;
    }
    case 'type': {
      // 说明文字类型设置
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for "type". Expected number.');
        break;
      }
      materialStore.changeTextType(payload);
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
  padding: 30px;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
}

.right {
  width: 320px;
  padding: 30px;
  overflow-y: scroll;
}
</style>
