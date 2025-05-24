<template>
  <div class="survey-com-group">
    <div class="title flex align-items-center">
      <el-icon style="font-size: 16px">
        <component :is="icon" />
      </el-icon>
      <span class="ml-5">{{ title }}</span>
    </div>
    <div class="survey-com-list mt-15">
      <SurveyComItem v-for="(item, index) in list" :key="index" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SurveyComItem from './SurveyComItem.vue';

const props = defineProps(['title', 'icon', 'list']);
</script>

<style scoped lang="scss">
.title {
  color: #000;
}

.survey-com-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
}
</style>
