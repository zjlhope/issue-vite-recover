import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { resolve, basename } from 'path'
import { version } from './package.json'

export default defineConfig(({ mode }) => {
  return {
    base: "",
    plugins: [
      vue(),
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue': resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      PROJECT_VERSION: JSON.stringify(version),
      VUE_APP_ISPHONE: JSON.stringify('true')
    },
    build: {
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/pages/a/index.html'),
          error: resolve(__dirname, 'src/pages/b/error.html'),
        },
        output: {
          manualChunks(id, { getModuleInfo }) {
            if (id.includes('node_modules')) {
              if (id.includes('vue')) {
                return 'vue'
              }
              if (id.includes('element-ui')) {
                return 'element-ui'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  }
})
