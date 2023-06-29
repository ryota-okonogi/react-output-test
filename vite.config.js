import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-output-custom-test/",
  test: {
    global: true,
    environment: "happy-dom",
    setupFiles: "src/setup.js",
  },
});
