<template>
  <div class="title-editor">
    <div class="mb-10">标题内容</div>
    <el-input placeholder="请输入内容" v-model="title" @input="inputHandle"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';

const props = defineProps<{
  id: string;
  isShow: boolean;
  name: string;
  status: string;
  configKey: string;
}>();

const title = ref(props.status);

const updateStatus = inject('updateStatus');

const inputHandle = () => {
  updateStatus(props.configKey, title.value);
};
</script>
