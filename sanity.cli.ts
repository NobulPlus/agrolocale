import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9oq1p93e',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  },
  studioHost: 'agrolocale',
  deployment: {
    appId: 'tpv0j5dpbtb95yjn4sytudv7',
  }
})
