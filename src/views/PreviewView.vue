<template>
  <div class="preview-view print-box">
    <div class="top">
      <div class="left not-print">
        <el-button type="danger" @click="handleGoBack">返回</el-button>
        <el-button type="success" @click="handleGenerateQuiz">生成在线问卷</el-button>
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
  <el-dialog v-model="dialogVisible" title="在线问卷" width="500">
    分享链接: <a :href="quizLink" target="_blank">{{ quizLink }}</a>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="copyLink">复制链接</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSurveyNo } from '@/hooks/useSurveyNo.ts';
import { useEditorStore } from '@/stores/editorStore.ts';
import { canUsedForPDF, type Material } from '@/types/store.ts';
import { ElMessage } from 'element-plus';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const route = useRoute();
const surveyId = route.params.id;
const editorStore = useEditorStore();
const surveyNo = computed(() => useSurveyNo(editorStore.coms).value);
// 控制弹出框是否显示
const dialogVisible = ref(false);
const quizLink = ref(''); // 存储生成的在线答题的链接

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

const handleGenerateQuiz = () => {
  // 1. 首先将问卷的数据传递到服务器端，服务器端存储到内存中
  const id = uuidv4();
  // 将问卷内容和id传递给服务器
  fetch('/api/saveQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      quizData: {
        coms: JSON.stringify(editorStore.coms),
        surveyCount: editorStore.surveyCount,
      },
    }),
  });
  // 2. 将弹出框显示出来
  quizLink.value = `${window.location.origin}/quiz/${id}`;
  dialogVisible.value = true;
};

// 复制在线答题的链接
const copyLink = () => {
  dialogVisible.value = false;
  navigator.clipboard.writeText(quizLink.value);
  ElMessage.success('在线答题的链接已复制');
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
