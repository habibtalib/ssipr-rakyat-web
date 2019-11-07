import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: 'https://f34b00c59e5a491380c6df1001792552@sentry.io/1766485',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })]
})
