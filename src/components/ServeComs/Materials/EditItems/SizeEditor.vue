<template>
  <div class="size-editor">
    <EditorButtonGroup :title="curTitle" :status="status[currentStatus]">
      <el-radio-group v-model="curOption" :style="{ height: '100%' }">
        <el-radio-button :value="0">
          <font-awesome-icon :icon="['fas', 'font']" />
        </el-radio-button>
        <el-radio-button :value="1">
          <font-awesome-icon :icon="['fas', 'font']" size="sm" />
        </el-radio-button>
        <el-radio-button :value="2">
          <font-awesome-icon :icon="['fas', 'font']" size="xs" />
        </el-radio-button>
      </el-radio-group>
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
