<script setup>
import { getCurrentInstance, onMounted } from 'vue';
import Count from './count.es.js';
const { ctx } = getCurrentInstance();
onMounted(() => {
  const countNode = Count({
    onIncrement() {
      console.log('Vue component increment');
    },
    onDecrement() {
      console.log('Vue component decrement');
    }
  });
  ctx.$el.appendChild(countNode);
});
</script>

<template>
  <div></div>
</template>
