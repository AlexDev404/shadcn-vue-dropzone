<script setup lang="ts">
import {
  Dropzone,
  DropzoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzoneUpload,
} from '@/components/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      status: 'success' as const,
      result: URL.createObjectURL(file),
    }
  },
  validation: {
    accept: ['image/png', 'image/jpeg', 'image/jpg'],
    maxSize: 10 * 1024 * 1024,
    maxFiles: 10,
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Dropzone v-bind="dropzone">
      <div>
        <div class="flex justify-between">
          <DropzoneDescription>
            Please select up to 10 images
          </DropzoneDescription>
          <DropzoneMessage />
        </div>
        <DropzoneArea>
          <DropzoneTrigger class="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 13v8"></path>
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="m8 17 4-4 4 4"></path>
            </svg>
            <div>
              <p class="font-semibold">Upload images</p>
              <p class="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropzoneArea>
      </div>

      <DropzoneFileList class="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
        <DropzoneFileListItem
          v-for="file in dropzone.fileStatuses.value"
          :key="file.id"
          :file="file"
          class="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
        >
          <div
            v-if="file.status === 'pending'"
            class="aspect-video animate-pulse bg-black/20"
          />
          <img
            v-if="file.status === 'success'"
            :src="file.result"
            :alt="`uploaded-${file.fileName}`"
            class="aspect-video object-cover"
          />
          <div class="flex items-center justify-between p-2 pl-4">
            <div class="min-w-0">
              <p class="truncate text-sm">{{ file.fileName }}</p>
              <p class="text-xs text-muted-foreground">
                {{ (file.file.size / (1024 * 1024)).toFixed(2) }} MB
              </p>
            </div>
            <DropzoneRemoveFile
              variant="ghost"
              class="shrink-0 hover:outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </DropzoneRemoveFile>
          </div>
        </DropzoneFileListItem>
      </DropzoneFileList>
    </Dropzone>
  </div>
</template>
