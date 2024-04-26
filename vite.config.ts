import react from '@vitejs/plugin-react-swc'

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'

const vendors = [`react`, `react-dom`]

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    publicDir: './static',
    plugins: [react(), checker({ typescript: true })],
    build: {
      copyPublicDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: vendors,
            packages: ['i18next'],
          },
        },
        onLog(level, log, handler) {
          if (log.code === 'CYCLIC_CROSS_CHUNK_REEXPORT') return
          handler(level, log)
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        abstract: path.resolve(__dirname, './src/abstract'),
        utils: path.resolve(__dirname, './src/utils'),
        ui: path.resolve(__dirname, './src/ui'),
        themes: path.resolve(__dirname, './src/shared/themes'),
      },
    },
    server: {
      proxy: {
        '/api/v1/tree': env.DECISIONS_URL,
        '/api/v1/attribute': env.ATTRIBUTES_URL,
        '/api/v1/rule': env.RULES_URL,
        '/api/v1/domain': env.DOMAINS_URL,
        '/api/v1/groupAttribute': env.GROUP_OFFER_ATTRIBUTES_URL,
        '/api/v1/offerAttribute': env.OFFER_ATTRIBUTES_URL,
        '/api/v1/offerTemplate': env.OFFER_TEMPLATE,
        '/api/v1/calcAttribute': env.CALC_ATTRIBUTES_URL,
        '/api/v1/sourceSystem': env.SOURCE_SYSTEM,
        // '/graphql': env.GRAPH_QL_URL,
        '/graphql': env.GRAPH_QL_URL,
      },
    },
  }
})
