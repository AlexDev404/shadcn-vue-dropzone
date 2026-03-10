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
  useDropzoneUpload 
} from '@/components/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Simulate 80% success rate
    if (Math.random() > 0.2) {
      return {
        status: 'success' as const,
        result: 'File uploaded successfully',
      }
    }
    return {
      status: 'error' as const,
      error: 'Failed to upload file',
    }
  },
  validation: {
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  maxRetryCount: 3,
})
</script>

<template>
  <main class="container min-h-screen py-20 px-4 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-2">shadcn-vue Dropzone</h1>
    <p class="text-muted-foreground mb-8">
      A dropzone component built with shadcn-vue and vue3-dropzone
    </p>
    
    <Dropzone v-bind="dropzone">
      <div class="flex justify-between">
        <DropzoneDescription>
          Please select up to 10 files (max 10MB each)
        </DropzoneDescription>
        <DropzoneMessage class="text-right" />
      </div>
      
      <DropzoneArea class="flex flex-col items-center gap-2 pt-10">
        <DropzoneTrigger class="flex flex-col items-center gap-4 rounded-md px-6 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-8">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" x2="12" y1="3" y2="15"></line>
          </svg>
          Click here or drag and drop files to upload them
        </DropzoneTrigger>
        
        <DropzoneFileList class="w-full">
          <DropzoneFileListItem
            v-for="file in dropzone.fileStatuses.value"
            :key="file.id"
            :file="file"
          >
            <div class="flex justify-between">
              <div class="flex min-w-0 items-center gap-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                </svg>
                <p class="truncate">{{ file.fileName }}</p>
              </div>
              <div class="flex items-center gap-2">
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
      </DropzoneArea>
    </Dropzone>
  </main>
</template>
