<template>
  <div class="material-header">
    <h2
      class="title"
      :class="{ 'font-bold': !titleWeight, 'font-italic': !titleItalic }"
      :style="{ fontSize: `${titleSize}px`, color: titleColor }"
    >
      <span>{{ serialNum }}.</span>
      <span>{{ title }}</span>
    </h2>
    <div
      class="desc"
      :class="{ 'font-bold': !descWeight, 'font-italic': !descItalic }"
      :style="{ fontSize: `${descSize}px`, color: descColor }"
    >
      {{ desc }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  serialNum: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    default: 'Watching the moon',
  },
  desc: {
    type: String,
    default: '我明白',
  },
  titleSize: {
    type: String,
    default: '20',
  },
  descSize: {
    type: String,
    default: '14',
  },
  titleWeight: {
    // 文字粗细
    // 0 加粗
    // 1 正常
    type: Number,
    default: 0,
  },
  descWeight: {
    type: Number,
    default: 1,
  },
  titleItalic: {
    // 文字是否倾斜
    // 0 倾斜
    // 1 正常
    type: Number,
    default: 0,
  },
  descItalic: {
    type: Number,
    default: 0,
  },
  titleColor: {
    type: String,
    default: '#303133',
  },
  descColor: {
    type: String,
    default: '#909399',
  },
});
</script>

<style scoped lang="scss">
// 以下样式有被行内样式覆盖的可能（根据数据仓库的特定字段的值而决定）
h2 {
  font-size: 22px;
  font-weight: normal;

  & > span {
    margin-right: 5px;
  }
}

.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}
</style>
