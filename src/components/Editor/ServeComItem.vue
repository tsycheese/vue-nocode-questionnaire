<template>
  <div class="serve-com-item">{{ comName }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  materialName: {
    type: String,
    default: '',
  },
  comName: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.serve-com-item {
  width: 80px;
  height: 30px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
  color: var(-el-text-color-primary);
  text-align: center;
  line-height: 30px;
  cursor: pointer;

  &:hover {
    background-color: var(--el-fill-color-darker);
  }
}
</style>
