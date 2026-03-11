# shadcn-vue Dropzone

A dropzone component built with [shadcn-vue](https://www.shadcn-vue.com/) and [vue3-dropzone](https://github.com/nicmarson/vue3-dropzone). This provides a fully accessible file upload component in the style of shadcn-vue.

## Installation

### Prerequisites

Make sure you have shadcn-vue set up in your Vue 3 project. If you haven't, follow the [shadcn-vue installation guide](https://www.shadcn-vue.com/docs/installation).

### Install vue3-dropzone

```bash
npm install vue3-dropzone
# or
pnpm add vue3-dropzone
# or
yarn add vue3-dropzone
```

### Copy the component

Copy the files from `src/components/ui/dropzone/` to your project's component directory.

## Usage

```vue
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
  onDropFile: async (file) => {
    // Handle file upload
    await uploadFile(file)
    return {
      status: 'success',
      result: 'File uploaded successfully',
    }
  },
  validation: {
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
  },
})
</script>

<template>
  <Dropzone v-bind="dropzone">
    <DropzoneDescription>
      Please select up to 10 files
    </DropzoneDescription>
    <DropzoneMessage />
    
    <DropzoneArea>
      <DropzoneTrigger>
        Click here or drag and drop files to upload
      </DropzoneTrigger>
      
      <DropzoneFileList>
        <DropzoneFileListItem
          v-for="file in dropzone.fileStatuses.value"
          :key="file.id"
          :file="file"
        >
          <div>{{ file.fileName }}</div>
          <InfiniteProgress :status="file.status" />
          <DropzoneFileMessage />
          <DropzoneRetryFile v-if="file.status === 'error'">
            Retry
          </DropzoneRetryFile>
          <DropzoneRemoveFile>Remove</DropzoneRemoveFile>
        </DropzoneFileListItem>
      </DropzoneFileList>
    </DropzoneArea>
  </Dropzone>
</template>
```

## API

### useDropzoneUpload Options

| Option | Type | Description |
|--------|------|-------------|
| `onDropFile` | `(file: File) => Promise<{ status: 'success' \| 'error', result?: T, error?: E }>` | Handler called when a file is dropped |
| `onRemoveFile` | `(id: string) => void \| Promise<void>` | Handler called when a file is removed |
| `onFileUploaded` | `(result: T) => void` | Callback when a file is successfully uploaded |
| `onFileUploadError` | `(error: E) => void` | Callback when a file upload fails |
| `onAllUploaded` | `() => void` | Callback when all files are uploaded |
| `onRootError` | `(error: string \| undefined) => void` | Callback for root-level validation errors |
| `maxRetryCount` | `number` | Maximum number of retry attempts |
| `autoRetry` | `boolean` | Automatically retry failed uploads |
| `validation.accept` | `string \| string[]` | Accepted file types |
| `validation.minSize` | `number` | Minimum file size in bytes |
| `validation.maxSize` | `number` | Maximum file size in bytes |
| `validation.maxFiles` | `number` | Maximum number of files |
| `shiftOnMaxFiles` | `boolean` | Replace oldest file when max is reached |
| `shapeUploadError` | `(error: E) => string \| void` | Transform upload errors for display |

### Components

- **Dropzone** - Root component that provides context
- **DropzoneArea** - The droppable area
- **DropzoneTrigger** - Clickable trigger to open file dialog
- **DropzoneDescription** - Description text
- **DropzoneMessage** - Root error message display
- **DropzoneFileList** - Container for file list items
- **DropzoneFileListItem** - Individual file item
- **DropzoneFileMessage** - Per-file error message
- **DropzoneRemoveFile** - Button to remove a file
- **DropzoneRetryFile** - Button to retry a failed upload
- **InfiniteProgress** - Progress indicator

## License

MIT
