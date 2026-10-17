import { defineConfig } from 'vite';
import {
  behaviorPacker as hakomcPlugin,
  supportJsx,
} from 'hakomc/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    hakomcPlugin({
      name: "test",
      uuid: "82b9174d-ea3d-42ae-986c-b42ce3644760",
      // assets/ に置いた画像・モデルなどと、エンティティ定義から作った見た目を入れるリソースパック
      resourcePack: { uuid: "3c1f4a52-7d0e-4b8a-9f61-2e5b8c7d9a10" },
    }),
    supportJsx(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
});
