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

<script setup>
import { computed } from 'vue';
import { useMaterialStore } from '@/stores/materialStore.ts';
import EditPanel from '@/components/ServeComs/Materials/EditItems/EditPanel.vue';

const materialStore = useMaterialStore();
const currentMaterialCom = computed(() => materialStore.coms[materialStore.currentMaterialCom]);
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
