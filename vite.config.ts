import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import copy from 'rollup-plugin-copy'
import { join, resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/popup',
  plugins: [
    vue(),
    copy({
      verbose: true,
      hook: 'writeBundle',
      targets: [
        {
          src: 'src/manifest.json',
          dest: 'dist',
        },
      ]
    }),
  ],
  build: {
    emptyOutDir: true,
    outDir: join(__dirname, `dist`),
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/index.html'),
        background_script: resolve(__dirname, 'src/background_script/index.ts'),
        content_script: resolve(__dirname, 'src/content_script/index.ts'),
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
})
