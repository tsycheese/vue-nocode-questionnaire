<template>
  <Layout>
    <!-- 左侧 -->
    <!-- 单选题 | 多选题 | 下拉选择 | 图片单选题 | 图片多选题 -->
    <template #default>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/single-select">
        单选题
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/multi-select">
        多选题
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/option-select">
        下拉选择
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/single-pic-select">
        图片单选题
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/multi-pic-select">
        图片多选题
      </RouterLink>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout.vue';
</script>
