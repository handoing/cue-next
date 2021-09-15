import { defineConfig } from "vite";
import cuePlugin from "vite-plugin-cue";

export default defineConfig({
  plugins: [ cuePlugin({ debug: false }) ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    minify: false
  },
});
