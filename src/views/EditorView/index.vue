<template>
  <div class="editor-view">
    <Header class="header"></Header>
    <div class="container" ref="container">
      <div class="left">
        <LeftSide></LeftSide>
      </div>
      <div class="center">
        <Center class="center-inner"></Center>
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
import eventBus from '@/utils/eventBus.ts';
import { useTemplateRef } from 'vue';

const containerRef = useTemplateRef<HTMLDivElement>('container');

eventBus.on('scrollToBottom', () => {
  if (containerRef.value) {
    containerRef.value.scrollTo({
      top: containerRef.value.scrollHeight,
      behavior: 'smooth',
    });
  }
});
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.container {
  --container-height: calc(100vh - 50px - 40px);
  width: calc(100vw - 40px);
  height: var(--container-height);
  padding: 20px;
  background: url('@/assets/imgs/editor_background.png');
  position: fixed;
  top: 50px;
  overflow-y: auto;
}

.left,
.right {
  position: fixed;
  top: 70px;
  height: var(--container-height);
  background-color: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow-y: auto;
}

.left {
  left: 20px;
  width: 300px;
}

.right {
  left: calc(100vw - 330px - 40px);
  width: 330px;
}

.center {
  width: calc(100vw - 40px - 300px - 330px - 40px);
  margin-left: 320px;
  margin-bottom: 150px;

  .center-inner {
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }
}
</style>
