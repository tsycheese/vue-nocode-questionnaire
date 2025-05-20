<template>
  <div class="options-editor">
    <div class="flex mb-10">
      <span class="mr-10">题目选项</span>
      <el-button size="small" circle :icon="Plus" @click="handleAdd" />
    </div>
    <!-- 选项编辑 -->
    <div class="option" v-for="(item, index) in optionArr" :key="index">
      <!-- 选项序号 -->
      <div class="serial">
        <span class="mr-10">选项{{ index + 1 }}</span>
        <el-button type="danger" size="small" circle :icon="Minus" @click="handleRemove(index)" />
      </div>
      <!-- 上传图片提示 -->
      <div class="upload-hint mb-8">
        <div v-if="item.value" class="flex align-items-center">
          <span class="mr-10">已上传图片</span>
          <el-link type="danger" @click="deletePic(index)">删除图片</el-link>
        </div>
        <div v-else>
          <span>未上传图片</span>
        </div>
      </div>
      <!-- 图片选项标题 -->
      <div class="title mb-8">
        <el-input v-model="item.picTitle" />
      </div>
      <!-- 图片选项描述 -->
      <div class="desc">
        <el-input type="textarea" v-model="item.picDesc" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
import type { PicTitleDescStatusArr } from '@/types/editProps.ts';
import { ElMessageBox } from 'element-plus';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: PicTitleDescStatusArr;
  configKey: string;
}>();
const optionArr = ref(props.status); // 选项数组

// 注入更新状态方法
const updateStatus = inject('updateStatus');
// 添加选项
const handleAdd = () => {
  // @ts-ignore
  updateStatus && updateStatus(props.configKey);
};
// 删除选项
const handleRemove = (index: number) => {
  // @ts-ignore
  updateStatus && updateStatus(props.configKey, index);
};
// 删除图片
const deletePic = (index: number) => {
  ElMessageBox.confirm('是否删除该图片？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    // 参考 PicLink 类型
    const payload = {
      index,
      link: '',
    };
    // @ts-ignore
    updateStatus && updateStatus(props.configKey, payload);
  });
};
</script>

<style scoped lang="scss">
.option {
  margin-bottom: 15px;
  font-size: var(--font-size-base);
  color: var(--el-text-color-regular);
}

.serial {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
