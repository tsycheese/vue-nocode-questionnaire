<template>
  <div class="text-note">
    <h1
      v-if="computedStatus.type === 0"
      :class="{
        'text-center': !!computedStatus.position,
        'font-bold': computedStatus.titleWeight === 0,
        'font-italic': computedStatus.titleItalic === 0,
      }"
      :style="{ color: computedStatus.titleColor, fontSize: computedStatus.titleSize + 'px' }"
    >
      {{ computedStatus.title }}
    </h1>
    <p
      v-else
      :class="{
        'text-center': !!computedStatus.position,
        'font-bold': computedStatus.descWeight === 0,
        'font-italic': computedStatus.descItalic === 0,
      }"
      :style="{ color: computedStatus.descColor, fontSize: computedStatus.descSize + 'px' }"
    >
      {{ computedStatus.desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TypeStatus } from '@/types/editProps.ts';
import { getTextStatus, getCurrentStatus, getStringStatusByCurrentStatus } from '@/utils/index.ts';

const props = defineProps<{
  status: TypeStatus;
  serialNum: number;
}>();

const computedStatus = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  type: getCurrentStatus(props.status.type),
  position: getCurrentStatus(props.status.position), // 通过下标来判断 position 的状态（左对齐：0，居中：1）
  titleSize: getStringStatusByCurrentStatus(props.status.titleSize),
  descSize: getStringStatusByCurrentStatus(props.status.descSize),
  titleWeight: getCurrentStatus(props.status.titleWeight), // 下标判断 weight 状态（加粗：0，正常：1）
  descWeight: getCurrentStatus(props.status.descWeight),
  titleItalic: getCurrentStatus(props.status.titleItalic), // 通过下标来判断 titleItalic 的状态（倾斜：0，正常：1）
  descItalic: getCurrentStatus(props.status.descItalic),
  titleColor: getTextStatus(props.status.titleColor),
  descColor: getTextStatus(props.status.descColor),
}));
</script>

<style scoped lang="scss">
// 以下样式有被行内样式覆盖的可能（根据数据仓库的特定字段的值而决定）
h1 {
  font-size: 22px;
  font-weight: normal;
}

.desc {
  font-size: var(--font-size-base);
  color: var(--font-color-light);
  text-indent: 5px;
}

.font-bold {
  font-weight: bold;
}
</style>
