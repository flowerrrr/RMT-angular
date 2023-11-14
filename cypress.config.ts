import {defineConfig} from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200/das-tool-2',
    '//': 'https://www.cypress.io/blog/2023/01/12/check-out-our-experimental-release-of-run-all-specs',
    'experimentalRunAllSpecs': true,
  },
  viewportWidth: 400,
  viewportHeight: 860,

})
