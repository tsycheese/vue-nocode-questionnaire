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

const materialStore = useMaterialStore();
const currentMaterialCom = computed(() => materialStore.coms[materialStore.currentMaterialCom]);

// 使用依赖注入向后代组件提供更新状态的方法
const updateStatus = (configKey: string, payload?: number | string | boolean) => {
  const CurProps = currentMaterialCom.value.status[configKey];
  switch (configKey) {
    case 'title':
    case 'desc': {
      if (typeof payload !== 'string') {
        console.error('Invalid payload type for "title or desc". Expected string.');
      }
      materialStore.setTextStatus(CurProps, payload as string);
      break;
    }
    case 'options': {
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
    case 'descSize': {
      // 居中设置 | 文字大小设置
      if (typeof payload !== 'number') {
        console.error('Invalid payload type for "position or size". Expected number.');
      }
      materialStore.setOptionsStatus(CurProps, payload as number);
      break;
    }
  }
};
provide('updateStatus', updateStatus);
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
}
</style>
