<script setup lang="ts">
import {
  Dropzone,
  DropzoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  DropzoneTrigger,
  InfiniteProgress,
  useDropzoneUpload,
} from '@/components/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 500 + 1000)
    )

    if (Math.random() > 0.8) {
      return {
        status: 'error' as const,
        error: 'Failed to upload file',
      }
    }
    return {
      status: 'success' as const,
      result: undefined,
    }
  },
  validation: {
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
            Please select up to 10 files
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
              <p class="font-semibold">Upload files</p>
              <p class="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropzoneArea>
      </div>

      <DropzoneFileList class="flex flex-col gap-3">
        <DropzoneFileListItem
          v-for="file in dropzone.fileStatuses.value"
          :key="file.id"
          :file="file"
          class="flex flex-col gap-3"
        >
          <div class="flex justify-between">
            <div class="flex min-w-0 items-center gap-2 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <p class="truncate">{{ file.fileName }}</p>
            </div>
            <div class="flex items-center gap-1">
              <DropzoneRetryFile
                v-if="file.status === 'error'"
                variant="ghost"
                class="hover:border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
              </DropzoneRetryFile>

              <DropzoneRemoveFile
                variant="ghost"
                class="hover:border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </DropzoneRemoveFile>
            </div>
          </div>
          <InfiniteProgress :status="file.status" />
          <div class="flex justify-between text-sm text-muted-foreground">
            <p>{{ (file.file.size / (1024 * 1024)).toFixed(2) }} MB</p>
            <DropzoneFileMessage />
          </div>
        </DropzoneFileListItem>
      </DropzoneFileList>
    </Dropzone>
  </div>
</template>
