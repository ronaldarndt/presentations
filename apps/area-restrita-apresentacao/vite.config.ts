import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['dayjs', '@braintree/sanitize-url'],
  },
})