importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/04442c31ff108b4c9804.js",
    "revision": "df278303c789048e3c5edc44c85a0c19"
  },
  {
    "url": "/_nuxt/396002c6daf59004964b.js",
    "revision": "0b134bd718487fa2a4cf1539876a0389"
  },
  {
    "url": "/_nuxt/5c532ee94b87b4e92a9c.js",
    "revision": "0f76cbccd7fcb0f84e569649891a4c14"
  },
  {
    "url": "/_nuxt/640e66696eeea160d054.js",
    "revision": "474c540feb55045384ed54e1ed11b822"
  },
  {
    "url": "/_nuxt/66514d714a636b7cd87b.js",
    "revision": "3bd966d3de944ce5f3320a8a57ce536c"
  },
  {
    "url": "/_nuxt/731f65312347b030273e.js",
    "revision": "2708e28c1871d9d7feafeb69a96ddcfa"
  },
  {
    "url": "/_nuxt/79a68b3c251b32ce1b31.js",
    "revision": "c44baaaa858155f691fa582114734234"
  },
  {
    "url": "/_nuxt/9069ba769dc822c63061.js",
    "revision": "8c550c761680334110b49b224b4c431b"
  },
  {
    "url": "/_nuxt/ad2ade4ac632745aff55.js",
    "revision": "28287db85e58bdc7c7843abec4bcfb3a"
  },
  {
    "url": "/_nuxt/becfc3b010dabe2484c9.js",
    "revision": "1ad1573683f3cafa5f719717396c7e22"
  },
  {
    "url": "/_nuxt/c98b96ee06cf97089bc8.js",
    "revision": "33e8c287d2ad6d3d5efaaa3e5edfcee6"
  },
  {
    "url": "/_nuxt/cd0b8a515fa7473aaeac.js",
    "revision": "d4fe6683189b672f6212b687a270b6b8"
  },
  {
    "url": "/_nuxt/ea4af9d10067dd1a04bd.js",
    "revision": "15039881f4c9e65da680f7757050b5f9"
  },
  {
    "url": "/_nuxt/f0ee69b6b4d721e708b0.js",
    "revision": "862dcfc875949a2852d3d9d9b836b6a6"
  },
  {
    "url": "/_nuxt/f65cac5354a8b1f60932.js",
    "revision": "2dca365ce93773820a93c0db66bb96a1"
  },
  {
    "url": "/_nuxt/f75b47222530fe3c86d2.js",
    "revision": "308538753901355241da4a81e30502f5"
  },
  {
    "url": "/_nuxt/fb9992b7748da04bf31e.js",
    "revision": "88566f0f3cb463390668ea974fdd5c95"
  },
  {
    "url": "/_nuxt/fcbc4565a76d1af0c037.js",
    "revision": "297a3e71ed885a1eefa592ce7a86fd5f"
  }
], {
  "cacheId": "inisiatif_peduli_rakyat_selangor",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
