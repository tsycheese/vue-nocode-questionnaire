<template>
  <div class="preview-view print-box">
    <div class="top">
      <div class="left not-print">
        <el-button type="danger" @click="handleGoBack">返回</el-button>
        <el-button type="success">生成在线问卷</el-button>
        <el-button type="warning" @click="handleGeneratePDF">生成本地PDF</el-button>
      </div>
      <div class="right">题目数量：{{ editorStore.surveyCount }}</div>
    </div>
    <div class="main" v-if="surveyNo">
      <div class="com-item" v-for="(com, index) in editorStore.coms">
        <component :is="com.type" :status="com.status" :serialNum="surveyNo[index]"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSurveyNo } from '@/hooks/useSurveyNo.ts';
import { useEditorStore } from '@/stores/editorStore.ts';
import { canUsedForPDF, type Material } from '@/types/store.ts';
import { ElMessage } from 'element-plus';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const surveyId = route.params.id;
const editorStore = useEditorStore();
const surveyNo = computed(() => useSurveyNo(editorStore.coms).value);

// 在组件挂载前获取问卷数据
onBeforeMount(async () => {
  if (surveyId) {
    await editorStore.getSurveyFromDB(Number(surveyId));
  } else {
    // 如果没有 surveyId，则重置 store
    editorStore.setStore();
  }
});

const handleGoBack = () => {
  const from = history.state.from;
  if (from === 'home') {
    router.push('/');
  } else {
    router.go(-1);
  }
};

const handleGeneratePDF = () => {
  // 1. 检查：检查当前的问卷是否存在不适合生成PDF的业务组件
  const result = editorStore.coms.every((item) => canUsedForPDF(item.name as Material));
  if (!result) {
    ElMessage.warning('当前问卷中存在不支持生成PDF的业务组件，请检查后再试！');
    return;
  }
  // 2. 开始生成PDF
  window.print();
};
</script>

<style scoped lang="scss">
.preview-view {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.com-item {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
}

@media print {
  .not-print {
    display: none;
  }

  .print-box {
    box-shadow: none;
    border: none;
  }
}
</style>
