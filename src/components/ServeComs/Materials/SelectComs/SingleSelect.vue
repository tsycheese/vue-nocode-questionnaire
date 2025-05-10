<template>
  <div>单选题</div>
</template>

<script setup lang="ts">
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
