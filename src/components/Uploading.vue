<template>
  <div class="uploading">
    <h1>Uploading...</h1>
    <div class="progress-bar">
      <div class="progress-bar__inner"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Uploading',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/_uploading';
</style>
