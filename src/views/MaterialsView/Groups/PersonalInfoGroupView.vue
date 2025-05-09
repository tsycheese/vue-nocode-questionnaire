<template>
  <Layout>
    <!-- 左侧 -->
    <!-- 姓名 | 身份证 | 出生日期 | 性别 | 年龄 | 学历 | 大学 | 专业 | 行业 | 职业 | 公司 | 职位 -->
    <template #default>
      <RouterLink class="link-item mb-15" to="/personal-info-name"> 姓名 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-id"> 身份证 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-birth"> 出生日期 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-gender"> 性别 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-age"> 年龄 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-education"> 学历 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-college"> 大学 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-major"> 专业 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-industry"> 行业 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-career"> 职业 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-company"> 公司 </RouterLink>
      <RouterLink class="link-item mb-15" to="/personal-info-position"> 职位 </RouterLink>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout.vue';
</script>
