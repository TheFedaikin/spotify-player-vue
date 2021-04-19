import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { compilerOptions } from './tsconfig.json'

const resolve = (pth: string) => {
  return path.resolve(__dirname, pth)
}

const alias = Object.entries(compilerOptions.paths).reduce((acc, item) => {
  const key = item[0]
  const value = item[1][0].replace('./', '/src/')

  return { ...acc, [key]: resolve(value) }
}, {})

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias,
  },
})
