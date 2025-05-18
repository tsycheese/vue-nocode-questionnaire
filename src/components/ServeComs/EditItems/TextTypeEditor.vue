<template>
  <div class="text-type-editor">
    <EditorButtonGroup title="说明类型" :status="status[currentStatus]">
      <el-radio-group v-model="curOption">
        <el-radio-button :value="0">
          <font-awesome-icon icon="heading" />
        </el-radio-button>
        <el-radio-button :value="1">
          <font-awesome-icon icon="paragraph" />
        </el-radio-button>
      </el-radio-group>
    </EditorButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, watch } from 'vue';
import EditorButtonGroup from './EditorButtonGroup.vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string[];
  currentStatus: number;
  configKey: string;
}>();
const curOption = ref(props.currentStatus);

const updateStatus = inject('updateStatus');

watch(curOption, (newVal) => {
  updateStatus && updateStatus(props.configKey, newVal);
});
</script>
