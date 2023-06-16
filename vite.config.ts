import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const MODE = process.env.NODE_ENV;
const development = MODE === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ reactivityTransform: true }),
    development &&
    nodePolyfills({
      include: [
        "node_modules/**/*.js",
        new RegExp("node_modules/.vite/.*js"),
      ],
    }),
  ],
  resolve: {
    alias: {
      assert: "assert",
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

