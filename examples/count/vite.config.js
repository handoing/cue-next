import { defineConfig } from "vite";
import cuePlugin from "vite-plugin-cue";
import path from 'path';

const isBuildComponent = process.env.BUILD_TYPE === 'component'

export default defineConfig({
  plugins: [ cuePlugin() ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
    minify: false,
    ...(isBuildComponent ? {
      lib: {
        entry: path.resolve(__dirname, 'src/App.js'),
        name: 'App'
      }
    } : null),
  },
});
