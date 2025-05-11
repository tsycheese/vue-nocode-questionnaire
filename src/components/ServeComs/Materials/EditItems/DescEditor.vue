<template>
  <div class="desc-editor">
    <div class="mb-10">描述内容</div>
    <el-input placeholder="请输入内容" v-model="desc" @input="inputHandle"></el-input>
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

const desc = ref(props.status);

const updateStatus = inject('updateStatus');

const inputHandle = () => {
  updateStatus(props.configKey, desc.value);
};
</script>
