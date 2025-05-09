<template>
  <div class="materials-view">
    <Header />
    <h1 class="text-center font-weight-300">组件市场</h1>
    <div class="main">
      <!-- 左侧导航 -->
      <!-- 选择 | 文本输入 | 高级题型 | 备注说明 | 个人信息 | 联系方式 -->
      <nav class="category">
        <RouterLink class="category-item" to="/select-group">
          <el-icon>
            <CircleCheck />
          </el-icon>
          <span>选择</span>
        </RouterLink>
        <RouterLink class="category-item" to="/input-group">
          <el-icon>
            <EditPen />
          </el-icon>
          <span>文本输入</span>
        </RouterLink>
        <RouterLink class="category-item" to="/advanced-group">
          <el-icon>
            <Files />
          </el-icon>
          <span>高级题型</span>
        </RouterLink>
        <RouterLink class="category-item" to="/note-group">
          <el-icon>
            <ChatLineSquare />
          </el-icon>
          <span>备注说明</span>
        </RouterLink>
        <RouterLink class="category-item" to="/personal-info-group">
          <el-icon>
            <User />
          </el-icon>
          <span>个人信息</span>
        </RouterLink>
        <RouterLink class="category-item" to="/contact-group">
          <el-icon>
            <Message />
          </el-icon>
          <span>联系方式</span>
        </RouterLink>
      </nav>
      <!-- 路由出口 -->
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue';
import {
  CircleCheck,
  EditPen,
  Files,
  ChatLineSquare,
  User,
  Message,
} from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.main {
  width: 1200px;
  margin: 0 auto;
  display: flex;
}

.content {
  flex: 1;
}

.category-item {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

@for $i from 1 through 4 {
  .category-item:nth-child(4n + #{$i}) {
    @if $i == 1 {
      background-color: var(--el-color-primary);
    }
    @if $i == 2 {
      background-color: var(--el-color-success);
    }
    @if $i == 3 {
      background-color: var(--el-color-warning);
    }
    @if $i == 4 {
      background-color: var(--el-color-danger);
    }
  }
}
</style>
