<template>
  <Layout>
    <!-- 左侧 -->
    <!-- 手机 | 微信号 | QQ号 | 邮箱 | 地址 -->
    <template #default>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/personal-info-tel">
        手机
      </RouterLink>
      <RouterLink
        class="link-item mb-15"
        active-class="link-item-active"
        to="/personal-info-wechat"
      >
        微信号
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/personal-info-qq">
        QQ号
      </RouterLink>
      <RouterLink class="link-item mb-15" active-class="link-item-active" to="/personal-info-email">
        邮箱
      </RouterLink>
      <RouterLink
        class="link-item mb-15"
        active-class="link-item-active"
        to="/personal-info-address"
      >
        地址
      </RouterLink>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '../Layout.vue';
</script>
