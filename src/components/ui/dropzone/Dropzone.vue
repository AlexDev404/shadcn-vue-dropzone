<script setup lang="ts">
import { provide } from 'vue'
import { DropzoneContextKey, type UseDropzoneUploadReturn } from './useDropzoneUpload'

const props = defineProps<UseDropzoneUploadReturn<unknown, unknown>>()

provide(DropzoneContextKey, props)
</script>

<template>
  <slot />
</template>
