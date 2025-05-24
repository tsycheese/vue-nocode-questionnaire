<template>
  <div class="left-side">
    <div class="tabs">
      <RouterLink class="tab-item" active-class="tab-active" to="/editor/survey-type">
        <el-icon><Document /></el-icon>
        <span>题型</span>
      </RouterLink>
      <RouterLink class="tab-item" active-class="tab-active" to="/editor/outline">
        <el-icon><Memo /></el-icon>
        <span>大纲</span>
      </RouterLink>
    </div>
    <!-- 可能是 OutlineView | SurveyTypeView -->
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document, Memo } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.left-side {
  height: 100%;
  width: 100%;
  display: flex;
}

.tabs {
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid var(--border-color);
}

.tab-item {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 16px;
  color: var(--el-text-color-secondary);

  span {
    font-size: 14px;
  }

  &.tab-active {
    color: var(--el-color-primary);
  }
}

.view {
  flex: 1;
}
</style>
