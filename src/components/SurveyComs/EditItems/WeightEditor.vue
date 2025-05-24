<template>
  <div class="italic-editor">
    <EditorButtonGroup :title="curTitle" :status="status[currentStatus]">
      <el-radio-group v-model="curOption">
        <el-radio-button :value="0">
          <font-awesome-icon :icon="['fas', 'bold']" />
        </el-radio-button>
        <el-radio-button :value="1">
          <font-awesome-icon :icon="['fas', 'bold']" size="xs" />
        </el-radio-button>
      </el-radio-group>
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
  status: string[];
  currentStatus: number;
  configKey: string;
}>();
const curTitle = computed(() => {
  let title = '';
  if (props.configKey === 'titleWeight') {
    title = '标题粗细';
  } else if (props.configKey === 'descWeight') {
    title = '描述粗细';
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
