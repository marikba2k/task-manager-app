import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // ✅ Add this to enable DOM support in tests
    globals: true, // Optional: Enables global Jest-like functions
    exclude: [...configDefaults.exclude], // Keeps default exclusions
  },
});
