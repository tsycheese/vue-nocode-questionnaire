<template>
  <div class="single-select">
    <MaterialHeader />
  </div>
</template>

<script setup lang="ts">
import MaterialHeader from '../Common/MaterialHeader.vue';

const props = defineProps({
  status: {
    type: Object,
  },
  serialNum: {
    type: Number,
  },
});
console.log(props);
</script>
