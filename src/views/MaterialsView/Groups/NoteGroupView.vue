<template>
  <Layout>
    <!-- 左侧 -->
    <!-- 备注说明 -->
    <template #default>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/text-note">
        备注说明
      </RouterLink>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout.vue';
</script>
