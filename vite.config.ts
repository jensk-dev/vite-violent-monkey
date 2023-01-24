import { resolve } from "path";
import dns from "dns";
import { defineConfig } from "vite";
import { plugin as violentMonkey } from "rollup-plugin-violent-monkey";

import metadata, { script } from "./violentmonkey.metadata";

// sets local dev server address to 127.0.0.1 instead of localhost, which is required for violentmonkey to work.
dns.setDefaultResultOrder("verbatim");

const outFileName = `${script}.user.js`;
const entryFilePath = resolve(__dirname, "src/main.ts");

// exclude jquery from the build
const external = [
  /^jquery$/
];

// set $ as the global associated with jquery
const globals = {
  jquery: "$"
};

export default defineConfig({
  build: {
    lib: {
      entry: entryFilePath,
      name: script,
      formats: ["iife"]
    },
    rollupOptions: {
      output: {
        entryFileNames: outFileName,
        globals
      },
      plugins: [violentMonkey(metadata)],
      external
    }
  },
  server: {
    open: outFileName
  }
});
