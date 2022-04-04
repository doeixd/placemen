import { defineConfig } from "vite";
import solid from "solid-start";
import babel from 'vite-plugin-babel'
import 'dotenv/config'

export default defineConfig({
  plugins: [
    solid({
      ssr: false,
      babel: {
        plugins: ['transform-inline-environment-variables']
      },
    }),
  ],
})
