<template>
  <div class="italic-editor">
    <EditorButtonGroup :title="curTitle" :status="status[currentStatus]">
      <el-radio-group v-model="curOption">
        <el-radio-button :value="0">
          <font-awesome-icon :icon="['fas', 'italic']" />
        </el-radio-button>
        <el-radio-button :value="1"> ⊥ </el-radio-button>
      </el-radio-group>
    </EditorButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import EditorButtonGroup from '../Common/EditorButtonGroup.vue';

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
  if (props.configKey === 'titleItalic') {
    title = '标题倾斜';
  } else if (props.configKey === 'descItalic') {
    title = '描述倾斜';
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
