<template>
  <div class="edit-pannel">
    <div>你好</div>
  </div>
</template>

<script setup lang="ts">
import type { ComStatus } from '@/types/common.ts';

const props = defineProps<{
  com: ComStatus;
}>();
</script>

<style scoped></style>
