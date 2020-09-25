<template>
  <div class="success">
    <div class="success-card">
      <div class="success-card__head">
        <span class="material-icons">
          check_circle
        </span>
        <h1>Uploaded Successfully!</h1>
      </div>
      <img :src="image.url" :alt="image.filename" />
      <div class="link">
        <input ref="urlEl" type="text" :value="image.url" />
        <Button @click="copyLink">Copy</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { RootState } from '@/store'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

export default defineComponent({
  name: 'Success',
  components: {
    Button
  },
  setup() {
    const image = ref<any>({})
    const store = useStore<RootState>()
    const router = useRouter()

    const urlEl = ref<HTMLInputElement>(null)

    if (store.state.image === null) {
      router.push('/')
    } else {
      image.value = store.state.image
    }

    const copyLink = () => {
      urlEl.value.select()
      document.execCommand('copy')
    }

    return {
      image,
      copyLink,
      urlEl
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/_success';
</style>
