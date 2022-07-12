import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
      ]
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*{js,css,html,ico,png,svg}']
      },
      includeAssets: [
        'images/icons/icon-72x72.png',
        'images/icons/icon-96x96.png',
        'images/icons/icon-128x128.png',
        'images/icons/icon-144x144.png',
        'images/icons/icon-152x152.png',
        'images/icons/icon-192x192.png',
        'images/icons/icon-384x384.png',
        'images/icons/icon-512x512.png',
        'images/icons/mask-icon.svg'
      ],
      manifest: {
        name: 'Pfadinamen-Generator',
        short_name: 'Pfadinamen',
        description: 'Generiere mit künstlicher Intelligenz auf Knopfdruck neue Pfadinamen!',
        theme_color: '#3a1c71',
        icons: [
          {
            "src": "images/icons/icon-72x72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-128x128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-144x144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-152x152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "images/icons/icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ]
})
