<template>
  <div class="home-container p-20">
    <h1 class="font-weight-300 text-center">问卷系统</h1>
    <!-- 按钮组 -->
    <div class="mb-15">
      <el-button type="primary" :icon="Plus" @click="goToEditor">创建问卷</el-button>
      <el-button type="success" :icon="Compass" @click="goToCompMarket">组件市场</el-button>
    </div>
    <!-- 数据表格 -->
    <!-- | 创建日期 | 问卷标题 | 题目数量 | 最后编辑日期 | 操作  -->
    <el-table :data="tableData" border :row-style="{ height: '60px' }">
      <el-table-column
        fixed="left"
        prop="createDate"
        label="创建日期"
        width="180"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column prop="title" label="问卷标题"></el-table-column>
      <el-table-column
        prop="surveyCount"
        label="题目数量"
        width="180"
        algin="center"
      ></el-table-column>
      <el-table-column
        prop="updateDate"
        label="最后编辑日期"
        width="180"
        align="center"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="goToPreview(scope.row)">查看问卷</el-button>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Plus, Compass } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { setActiveView } from '@/utils/webStorage.ts';
import { ActiveView } from '@/utils/webStorage.ts';
import { getAllSurveys } from '@/db/operation.ts';
import type { SurveyDBData } from '@/types/db.ts';
import { formatDate } from '@/utils/date.ts';

const router = useRouter();
const tableData = ref<SurveyDBData[]>([]);

const getData = async () => {
  try {
    const surveys = await getAllSurveys();
    tableData.value = surveys;
  } catch (error) {
    console.error('Error fetching surveys:', error);
  }
};
getData();

const goToCompMarket = () => {
  // 设置当前活动视图为 MaterialView
  setActiveView(ActiveView.Materials);
  router.push('/materials');
};

const goToEditor = () => {
  // 设置当前活动视图为 EditorView
  setActiveView(ActiveView.Editor);
  router.push('/editor');
};

const goToPreview = (row: SurveyDBData) => {
  // 设置当前活动视图为 PreviewView
  setActiveView(ActiveView.Preview);
  router.push(`/preview/${row.id}`);
};
</script>

<style scoped lang="scss">
.home-container {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
