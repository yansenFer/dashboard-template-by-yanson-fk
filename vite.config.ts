import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    reactRouter(),
    {
      name: 'ignore-chrome-devtools-json',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.url?.startsWith(
              '/.well-known/appspecific/com.chrome.devtools.json'
            )
          ) {
            res.statusCode = 204
            return res.end()
          }
          next()
        })
      },
    },
  ],
})
