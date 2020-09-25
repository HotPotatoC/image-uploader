<template>
  <div class="home">
    <div class="image-card" v-show="!image.isUploading">
      <div class="image-card__head">
        <h1>Upload Your Image</h1>
        <h4>File should be JPG, JPEG, or PNG</h4>
      </div>
      <div class="image-card__body">
        <div
          class="dropzone"
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          @drop="onDrop"
          @dragover.prevent
          :class="{ dragging: isDragging }"
        >
          <img src="@/assets/images/image.svg" />
          <h1>Drag & Drop your image here</h1>
          <input type="file" @change="onInputChange" />
        </div>
      </div>
      <div class="image-card__footer">
        <h1>Or</h1>
        <Button v-show="!image.file">
          <input type="file" @change="onInputChange" />Choose a file
        </Button>
        <Button v-show="image.file" @click="uploadImage">
          Upload
        </Button>

        <Alert
          v-show="image.error"
          :text="image.error"
          @close-alert="image.error = ''"
        />
      </div>
    </div>
    <Uploading v-show="image.isUploading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import { RootState } from '@/store'

import axios from '@/common/axios'
import { Nullable } from '@/common/types'

import Alert from '@/components/Alert.vue'
import Button from '@/components/Button.vue'
import Uploading from '@/components/Uploading.vue'

import { useRouter } from 'vue-router'

interface ImageState {
  file: Nullable<File>
  isUploading: boolean
  error: string
}

export default defineComponent({
  name: 'Home',
  components: {
    Alert,
    Button,
    Uploading
  },
  setup() {
    const store = useStore<RootState>()
    const router = useRouter()

    const isDragging = ref<boolean>(false)
    const dragCount = ref<number>(0)
    const image = reactive<ImageState>({
      file: null,
      isUploading: false,
      error: ''
    })

    const onDragEnter = (e: DragEvent) => {
      e.preventDefault()

      dragCount.value++
      isDragging.value = true

      return false
    }

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault()

      dragCount.value--
      if (dragCount.value <= 0) {
        isDragging.value = false
      }
    }

    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      image.error = null

      const file: File = (e.dataTransfer as DataTransfer).files[0]

      if (!file.type.match('image.*')) {
        image.error = 'File is not an image, Try again.'
        return
      }

      image.file = file
    }

    const onInputChange = (e: Event) => {
      e.preventDefault()
      image.error = null

      const el = e.target as HTMLInputElement
      const file: File = (el.files as FileList)[0]

      if (!file.type.match('image.*')) {
        image.error = 'File is not an image, Try again.'
        return
      }

      image.file = file
    }

    const uploadImage = async () => {
      const formData = new FormData()
      const file: Nullable<File> = image.file as File

      formData.append('image', file, file.name)

      try {
        image.isUploading = true

        const { data, status } = await axios.post('/upload', formData)

        if (status === 200) {
          image.isUploading = false

          store.dispatch('setImage', {
            fileName: data.filename,
            url: data.url
          })

          router.push(`/success`)
        }
      } catch (error) {
        if (error.response.status === 422) {
          image.error = error.response.data.message
        }
      }
    }

    return {
      isDragging,
      image,
      onDragEnter,
      onDragLeave,
      onDrop,
      onInputChange,
      uploadImage
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/_home';
</style>
