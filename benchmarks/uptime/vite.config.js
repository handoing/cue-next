import { defineConfig } from "vite";
import cuePlugin from "vite-plugin-cue";

export default defineConfig({
  plugins: [ cuePlugin() ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    minify: true,
  },
});
