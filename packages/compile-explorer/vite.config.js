import { defineConfig } from 'vite';

export default defineConfig((env) => ({
  define: {
    'process.env.BABEL_TYPES_8_BREAKING': 'true',
    'process.env.NODE_DEBUG': 'false',
    ...(env.command == 'build' ? {} : { global: 'globalThis' }),
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {},
      },
    },
  },
}));
