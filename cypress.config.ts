import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200/das-tool-2'
  },
  viewportWidth: 400,
  viewportHeight: 860,

})
