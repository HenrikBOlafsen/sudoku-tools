import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sudoku-tools/", // Ensure this matches your repository name
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
