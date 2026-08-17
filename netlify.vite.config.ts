import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "netlify-app",
  publicDir: "../public",
  plugins: [react()],
  build: {
    outDir: "../netlify-dist",
    emptyOutDir: true,
  },
});
