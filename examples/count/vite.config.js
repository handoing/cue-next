import { defineConfig } from "vite";
import cuePlugin from "vite-plugin-cue";

export default defineConfig({
  plugins: [ cuePlugin({ debug: true }) ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    minify: false
  },
});
