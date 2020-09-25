<template>
  <div class="alert">
    <h1>{{ text }}</h1>
    <button @click="closeAlert">
      <span class="material-icons">
        close
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Alert',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const closeAlert = () => {
      ctx.emit('close-alert')
    }

    return {
      closeAlert
    }
  }
})
</script>
