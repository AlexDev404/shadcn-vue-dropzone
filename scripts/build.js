// Build script to create the registry JSON for shadcn-vue
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dropzoneDir = path.join(__dirname, '../src/components/ui/dropzone')
const outputDir = path.join(__dirname, '../public')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Read all files from the dropzone directory
const files = fs.readdirSync(dropzoneDir)
const fileContents = files.map(file => ({
  path: `components/ui/dropzone/${file}`,
  content: fs.readFileSync(path.join(dropzoneDir, file), 'utf8'),
  type: 'registry:ui'
}))

const schema = {
  name: 'dropzone',
  type: 'registry:ui',
  registryDependencies: ['button', 'avatar'],
  dependencies: ['vue3-dropzone'],
  devDependencies: [],
  tailwind: {},
  cssVars: {
    light: {},
    dark: {}
  },
  files: fileContents
}

// Write the registry JSON
fs.writeFileSync(
  path.join(outputDir, 'dropzone.json'),
  JSON.stringify(schema, null, 2)
)

console.log('Registry JSON created successfully at public/dropzone.json')
