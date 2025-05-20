<template>
  <div class="right-side">
    <div v-if="currentMaterialCom">
      <EditPanel :com="currentMaterialCom" />
    </div>
    <div v-else>
      <p>请选择一个组件进行编辑</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore.ts';
import EditPanel from '@/components/ServeComs/EditItems/EditPanel.vue';
import { computed } from 'vue';

const editorStore = useEditorStore();
const currentMaterialCom = computed(() => editorStore.coms[editorStore.currentComIndex]);
</script>

<style scoped lang="scss">
.right-side {
  padding: 20px;
}
</style>
