<template>
  <div class="single-pic-select" :class="{ 'text-center': !!computedStatus.position }">
    <MaterialHeader
      :serialNum="props.serialNum"
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
    <div class="mt-10">
      <el-radio-group v-model="curSelected" class="pic-radio-group">
        <el-radio
          class="pic-option"
          v-for="(item, index) in computedStatus.options"
          :value="index"
          :key="index"
        >
          <PicItem :title="item.picTitle" :desc="item.picDesc" :url="item.value" :index="index" />
        </el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { OptionsStatus } from '@/types/editProps.ts';
import MaterialHeader from '../Common/MaterialHeader.vue';
import PicItem from '../Common/PicItem.vue';
import {
  getTextStatus,
  getCurrentStatus,
  getStringStatusByCurrentStatus,
  getPicTitleDescStatusArr,
} from '@/utils/index.ts';

const props = defineProps<{
  status: OptionsStatus;
  serialNum: number;
}>();
const computedStatus = computed(() => ({
  title: getTextStatus(props.status.title),
  desc: getTextStatus(props.status.desc),
  options: getPicTitleDescStatusArr(props.status.options),
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

<style scoped lang="scss">
.pic-radio-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
}

.pic-option {
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
  height: auto;
  // outline: 1px solid #008c8c;
}
</style>

<style lang="scss">
// 消除 el-radio 组件的 padding
.pic-radio-group .el-radio__label {
  padding: 0;
}

// 消除 el-radio 组件的 margin
.pic-radio-group .el-radio {
  margin: 0;
}
</style>
