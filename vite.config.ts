import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://github.com/mausam2026/weather-api", // 👈 MUST match your GitHub repo name
  plugins: [react()],
});
