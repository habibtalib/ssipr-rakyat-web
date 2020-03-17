importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute(
  [
    {
      url: '/_nuxt/0908d66de791ddd9bff1.js',
      revision: 'b0d79bee56d635c5c412c2d931dbcb58'
    },
    {
      url: '/_nuxt/0c8f71e46b984b598564.js',
      revision: '51ea05835ae3009248ce4860432cc666'
    },
    {
      url: '/_nuxt/25b39526ade6229d1cb1.js',
      revision: 'b8c4b62eed8b2a99bae35f94f611d14c'
    },
    {
      url: '/_nuxt/2a65b381c9396d4ee584.js',
      revision: 'b2c0bd60a25742fa3fb05ee376f07c9a'
    },
    {
      url: '/_nuxt/2be62ea316e4c8f8b663.js',
      revision: '8ed0170e536db5cfc07001ce8f1b3805'
    },
    {
      url: '/_nuxt/4a7d2afb21daa633b5b0.js',
      revision: '9463de6631abaad0ce56cd76ba21fb74'
    },
    {
      url: '/_nuxt/4dbd6b999ce9a9adb4bb.js',
      revision: 'a1723d1760d6399fea87873a20be88b3'
    },
    {
      url: '/_nuxt/5ab5d05497a7bef2b96c.js',
      revision: 'b4e833388f11c8518fbbf3c1e2b94a36'
    },
    {
      url: '/_nuxt/5ae4bf5042a63fe7ee27.js',
      revision: 'f6f569728491db19d1d23cd2b5a65e66'
    },
    {
      url: '/_nuxt/5c17c35d23d64d87112d.js',
      revision: 'b133a35823994341ab70b5c7e83fba0f'
    },
    {
      url: '/_nuxt/6bd8fa7de3e7b9787c75.js',
      revision: 'fcbeec3294d192ebd14d625a679df37a'
    },
    {
      url: '/_nuxt/81b6b7b08a45a0739c87.js',
      revision: '3a950591fea3e02e472241a1d017bd29'
    },
    {
      url: '/_nuxt/9959299902c1221847b0.js',
      revision: 'f2a84820335254206023da4833b23692'
    },
    {
      url: '/_nuxt/996ae9c7bec641d07f11.js',
      revision: '316bca256b7a7e8803e721e640016e1d'
    },
    {
      url: '/_nuxt/a241573af35ca50b5252.js',
      revision: '14d19398a9e4a74ad33a70b1cd0d1e94'
    },
    {
      url: '/_nuxt/c4eab327fbe6bb520ddb.js',
      revision: 'd9a21d64bffb04cbe5b1c2b337945ecf'
    },
    {
      url: '/_nuxt/d3936f32fc7341fdc171.js',
      revision: '1a756f91343c3b969371395d22d5af8f'
    },
    {
      url: '/_nuxt/db7adcb942cb472b35df.js',
      revision: '8f0cd63758ea0fbca583aa8d6df30fff'
    },
    {
      url: '/_nuxt/df986e5e6ed150b8f97e.js',
      revision: 'd9cde4b8416ef9263e297f84a039f085'
    },
    {
      url: '/_nuxt/e23db6063a2d106e9bf6.js',
      revision: '18a8bbdaff1358d1fb4247dfa8cf75cc'
    }
  ],
  {
    cacheId: 'inisiatif_peduli_rakyat_selangor',
    directoryIndex: '/',
    cleanUrls: false
  }
)

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(
  new RegExp('/_nuxt/.*'),
  workbox.strategies.cacheFirst({}),
  'GET'
)

workbox.routing.registerRoute(
  new RegExp('/.*'),
  workbox.strategies.networkFirst({}),
  'GET'
)
