<template>
  <div class="title-editor">
    <div class="mb-10">标题内容</div>
    <el-input placeholder="请输入内容" v-model="title"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string;
}>();

const title = ref(props.status);
</script>
