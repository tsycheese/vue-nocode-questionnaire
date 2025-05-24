<template>
  <div class="survey-type-view">
    <SurveyComGroup
      v-for="(group, index) in SurveyComList"
      :key="index"
      v-bind="group"
      class="mb-30"
    ></SurveyComGroup>
  </div>
</template>

<script setup lang="ts">
import SurveyComGroup from '@/components/Editor/SurveyComGroup.vue';
import { SurveyComList } from '@/configs/SurveyGroupConfig';
</script>

<style scoped lang="scss">
.survey-type-view {
  padding: 20px;
}
</style>
