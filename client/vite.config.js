// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercept any request starting with /api
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        // REMOVE the rewrite line entirely
        // because your backend already has '/api' in its route
      },
    },
  },
});
