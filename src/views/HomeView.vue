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
    <el-table :data="tableData" border stripe :row-style="{ height: '60px' }">
      <el-table-column
        fixed="left"
        prop="createDate"
        label="创建日期"
        width="180"
      ></el-table-column>
      <el-table-column prop="title" label="问卷标题"></el-table-column>
      <el-table-column
        prop="questionCount"
        label="题目数量"
        width="180"
        algin="center"
      ></el-table-column>
      <el-table-column
        prop="lastEditDate"
        label="最后编辑日期"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="300" align="center">
        <template #default>
          <el-button type="primary" link>查看问卷</el-button>
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

const router = useRouter();

const tableData = ref([
  {
    createDate: '2023-10-01',
    title: '问卷标题1',
    questionCount: 10,
    lastEditDate: '2023-10-02',
  },
]);

const goToCompMarket = () => {
  router.push('/materials');
};

const goToEditor = () => {
  router.push('/editor');
};
</script>
