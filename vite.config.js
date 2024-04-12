import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { optimizeImports, optimizeCss } from "carbon-preprocess-svelte";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess:[
      optimizeImports(),
      optimizeCss()
    ]
  })],
})
