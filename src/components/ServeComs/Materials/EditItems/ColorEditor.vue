<template>
  <div class="italic-editor">
    <EditorButtonGroup :title="curTitle" :status="status">
      <el-color-picker v-model="curColor" />
    </EditorButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import EditorButtonGroup from './EditorButtonGroup.vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string;
  configKey: string;
}>();
const curTitle = computed(() => {
  if (props.configKey === 'titleColor') {
    return '标题颜色';
  } else if (props.configKey === 'descColor') {
    return '描述颜色';
  }
});
const curColor = ref(props.status);

const updateStatus =
  inject<(configKey: string, payload?: number | string | boolean) => void>('updateStatus');

watch(curColor, (newVal) => {
  updateStatus && updateStatus(props.configKey, newVal);
});
</script>
