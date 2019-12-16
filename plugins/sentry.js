import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://2b0fc92058b2403ea3966965499c8b60@sentry.io/1857681',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})
