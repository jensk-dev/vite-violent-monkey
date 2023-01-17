import { resolve } from "path";
import dns from "dns";
import { defineConfig } from "vite";
import { plugin as violentMonkey } from "rollup-plugin-violent-monkey";

import { script } from "./violentmonkey.metadata.js";

dns.setDefaultResultOrder("verbatim");

const fileName = `${script}.user`;

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName,
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [violentMonkey()],
      output: {
        manualChunks: {}
      }
    }
  },
  server: {
    open: `/${fileName}.js`
  }
});
