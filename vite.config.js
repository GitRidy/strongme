import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "StrongMe",
        short_name: "StrongMe",
        description: "Minimalist Workout Timer",
        theme_color: "#0A0A0C",
        background_color: "#0A0A0C",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/gitridy\.github\.io\/strongme\/.+\.json$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "workout-data",
            },
          },
        ],
      },
    }),
  ],
});
