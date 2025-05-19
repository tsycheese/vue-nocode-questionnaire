<template>
  <div class="editor-view">
    <Header></Header>
    <div class="container">
      <div class="left">
        <LeftSide></LeftSide>
      </div>
      <div class="center">
        <Center></Center>
      </div>
      <div class="right">
        <RightSide></RightSide>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Common/Header.vue';
import LeftSide from './LeftSide/index.vue';
import Center from './Center/index.vue';
import RightSide from './RightSide/index.vue';
</script>

<style scoped lang="scss">
.editor-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  background-image: url('@/assets/imgs/editor_background.png');
}

.left,
.center,
.right {
  background-color: var(--el-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-sizing: border-box;
}

.left {
  width: 300px;
}

.center {
  flex: 1;
  height: fit-content;
  min-width: 700px;
  max-width: 1000px;
}

.right {
  width: 330px;
}
</style>
