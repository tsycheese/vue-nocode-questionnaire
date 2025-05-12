<template>
  <div class="italic-editor">
    <EditorButtonGroup title="居中设置" :status="status[currentStatus]">
      <el-radio-group v-model="curOption">
        <el-radio-button :value="0">
          <font-awesome-icon :icon="['fas', 'align-left']" />
        </el-radio-button>
        <el-radio-button :value="1">
          <font-awesome-icon :icon="['fas', 'align-center']" />
        </el-radio-button>
      </el-radio-group>
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
  status: string[];
  currentStatus: number;
  configKey: string;
}>();
const curOption = ref(props.currentStatus);

const updateStatus =
  inject<(configKey: string, payload?: number | string | boolean) => void>('updateStatus');

watch(curOption, (newVal) => {
  updateStatus && updateStatus(props.configKey, newVal);
});
</script>
