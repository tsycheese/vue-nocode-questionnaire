<template>
  <div class="size-editor">
    <EditorButtonGroup :title="curTitle" :status="status[currentStatus]">
      <div class="options">
        <div class="option" :class="{ selected: currentStatus === 0 }" @click="curOption = 0">
          <font-awesome-icon :icon="['fas', 'font']" />
        </div>
        <div class="option" :class="{ selected: currentStatus === 1 }" @click="curOption = 1">
          <font-awesome-icon :icon="['fas', 'font']" size="sm" />
        </div>
        <div class="option" :class="{ selected: currentStatus === 2 }" @click="curOption = 2">
          <font-awesome-icon :icon="['fas', 'font']" size="xs" />
        </div>
      </div>
    </EditorButtonGroup>
  </div>
</template>

<script setup lang="ts">
import EditorButtonGroup from '../Common/EditorButtonGroup.vue';
import { ref, computed, inject, watch } from 'vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string[];
  currentStatus: number;
  configKey: string;
}>();
const curTitle = computed(() => {
  let title = '';
  if (props.configKey === 'titleSize') {
    title = '标题尺寸';
  } else if (props.configKey === 'descSize') {
    title = '描述尺寸';
  }
  return title;
});
const curOption = ref(props.currentStatus);

const updateStatus =
  inject<(configKey: string, payload?: number | string | boolean) => void>('updateStatus');

watch(curOption, (newVal) => {
  updateStatus && updateStatus(props.configKey, newVal);
});
</script>

<style scoped lang="scss">
.options {
  display: flex;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.option {
  box-sizing: border-box;
  padding: 0 15px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid var(--el-border-color);
  cursor: pointer;
  transition: 0.3s;

  &:last-child {
    border-right: none;
  }

  &:hover {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
  }

  &.selected {
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
  }
}
</style>
