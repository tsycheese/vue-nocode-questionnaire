<template>
  <div class="header">
    <div class="left">
      <el-button circle size="small" :icon="ArrowLeft" @click="router.push('/')" />
    </div>
    <div class="center"></div>
    <div class="right">
      <img :src="imgUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const imgUrl = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--white);
}

.left {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
}

.right {
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--border-color);

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
</style>
