import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/submit": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/delete": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/edit": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/get-tasks": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
