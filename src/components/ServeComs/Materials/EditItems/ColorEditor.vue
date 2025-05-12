<template>
  <div class="italic-editor">
    <EditorButtonGroup title="居中设置" :status="status">
      <el-color-picker v-model="curColor" />
    </EditorButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue';
import EditorButtonGroup from '../Common/EditorButtonGroup.vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string;
  configKey: string;
}>();
const curColor = ref(props.status);

const updateStatus =
  inject<(configKey: string, payload?: number | string | boolean) => void>('updateStatus');

watch(curColor, (newVal) => {
  updateStatus && updateStatus(props.configKey, newVal);
});
</script>
