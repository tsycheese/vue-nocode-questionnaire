<template>
  <Layout>
    <!-- 左侧 -->
    <!-- 评价/打分 | 日期/时间 -->
    <template #default>
      <RouterLink class="link-item mb-15" to="/rate-score"> 评价/打分 </RouterLink>
      <RouterLink class="link-item mb-15" to="/date-time"> 日期/时间 </RouterLink>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout.vue';
</script>
