import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/Front-end2024/',  // Здесь указываете ваш 
  
  build: {
    outDir: 'build',  // Указываем папку для сборки
  }
})