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
      "/api/manage-pricing": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-pricing/, "/api/pricing"),
      },
      "/api/manage-process": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-process/, "/api/process"),
      },
      "/api/manage-faqs": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-faqs/, "/api/faqs"),
      },
      "/api/manage-testimonials": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-testimonials/, "/api/testimonials"),
      },
      "/api/manage-experiences": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-experiences/, "/api/experiences"),
      },
      "/api/manage-techstack": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-techstack/, "/api/techstack"),
      },
      "/api/manage-blogs": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-blogs/, "/api/blogs"),
      },
      "/api/manage-socials": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-socials/, "/api/socials"),
      },
      "/api/manage-contacts": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-contacts/, "/api/contacts"),
      },
      "/api/manage-cv": {
        target: "https://manage.hmoni.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/manage-cv/, "/api/cv"),
      },
    },
  },
});
