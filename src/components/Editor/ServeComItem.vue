<template>
  <div class="serve-com-item" @click="addServeCom">{{ comName }}</div>
</template>

<script setup lang="ts">
import { defaultStatusMap } from '@/configs/defaultStatus/defaultStatusMap.ts';
import { useEditorStore } from '@/stores/editorStore.ts';
import type { Material } from '@/types/store.ts';
import { updateInitStatusBeforeAdd } from '@/utils/index.ts';
import eventBus from '@/utils/eventBus.ts';

const props = defineProps<{
  materialName: Material;
  comName: string;
}>();
const editorStore = useEditorStore();

const addServeCom = () => {
  if (!defaultStatusMap.hasOwnProperty(props.materialName)) {
    console.warn(`没有找到${props.materialName}的默认状态`);
    return;
  }
  // @ts-ignore
  let newCom = defaultStatusMap[props.materialName]();
  updateInitStatusBeforeAdd(newCom, props.materialName);
  editorStore.addCom(newCom);
  eventBus.emit('scrollToBottom');
};
</script>

<style scoped lang="scss">
.serve-com-item {
  width: 80px;
  height: 30px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
  color: var(-el-text-color-primary);
  text-align: center;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    background-color: var(--el-fill-color-darker);
  }
}
</style>
