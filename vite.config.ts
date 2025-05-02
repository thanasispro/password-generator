/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';


// https://vitejs.dev/config/
export default defineConfig({
  base: '/password-generator/',
  plugins: [react(), tailwindcss(), svgr({
      svgrOptions: {
        icon: true,
      },
    })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}']
  }
})