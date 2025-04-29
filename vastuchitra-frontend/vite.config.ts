import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({jsxRuntime:"classic"}),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: "build"
  },
  resolve: {
    root:path.resolve(__dirname,"."),
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
