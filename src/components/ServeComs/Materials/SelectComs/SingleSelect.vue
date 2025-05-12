<template>
  <div class="single-select" :class="{ 'text-center': !!computedStatus.position }">
    <MaterialHeader
      :serialNum="serialNum"
      :title="computedStatus.title"
      :desc="computedStatus.desc"
      :titleSize="computedStatus.titleSize"
      :descSize="computedStatus.descSize"
      :titleWeight="computedStatus.titleWeight"
      :descWeight="computedStatus.descWeight"
      :titleItalic="computedStatus.titleItalic"
      :descItalic="computedStatus.descItalic"
      :titleColor="computedStatus.titleColor"
      :descColor="computedStatus.descColor"
    />
    <div class="radio-group mt-10">
      <el-radio-group v-model="curSelected">
        <el-radio v-for="(item, index) in computedStatus.options" :value="index" :key="index">
          {{ item }}
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MaterialHeader from '../Common/MaterialHeader.vue';
import type { OptionsStatus } from '@/types/editProps.ts';
import {
  getTextStatus,
  getStringArrStatus,
  getCurrentStatus,
  getStringStatusByCurrentStatus,
} from '@/utils/index.ts';

const props = defineProps<{
  status: OptionsStatus;
  serialNum: number;
}>();

const computedStatus = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  options: getStringArrStatus(props.status.options),
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

const curSelected = ref(0);
</script>
