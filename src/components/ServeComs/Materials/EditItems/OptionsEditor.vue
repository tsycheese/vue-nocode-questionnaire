<template>
  <div class="options-editor">
    <div class="flex mb-10">
      <span class="mr-10">题目选项</span>
      <el-button size="small" circle :icon="Plus" @click="handleAdd" />
    </div>
    <!-- 选项编辑 -->
    <div class="option" v-for="(item, index) in textArr" :key="index">
      <el-input v-model="textArr[index]"></el-input>
      <el-button type="danger" size="small" circle :icon="Minus" @click="handleRemove(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string[];
  configKey: string;
}>();
const textArr = ref(props.status); // 选项数组

// 注入更新状态方法
const updateStatus =
  inject<(configKey: string, payload?: number | string | boolean) => void>('updateStatus');
// 添加选项
const handleAdd = () => {
  updateStatus && updateStatus(props.configKey);
};
// 删除选项
const handleRemove = (index: number) => {
  updateStatus && updateStatus(props.configKey, index);
};
</script>

<style scoped lang="scss">
.option {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}
</style>
