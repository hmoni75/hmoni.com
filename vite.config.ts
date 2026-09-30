import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      "/api/manage-hero": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-hero/, "/api/hero"),
      },
      "/api/manage-projects": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-projects/, "/api/projects"),
      },
      "/api/manage-services": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-services/, "/api/services"),
      },
    },
  },
});
