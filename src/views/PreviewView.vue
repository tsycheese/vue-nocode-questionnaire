<template>
  <div class="preview-view">
    <h1>预览页面</h1>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const surveyId = route.params.id;
const editorStore = useEditorStore();
</script>
