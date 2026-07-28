import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { resolve } from 'path';
import { supportJsx } from 'hakomc/vite-plugin';

export default defineConfig({
  plugins: [
    dts(),
    supportJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: 'dist/lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'hakomc',
        '@minecraft/server',
        '@minecraft/server-net',
        '@minecraft/server-ui',
      ],
    }
  },
});
