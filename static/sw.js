importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/03baf567ed44d46717ba.js",
    "revision": "fbd77cfe5370c15ca97b2b89517cbe79"
  },
  {
    "url": "/_nuxt/0d54485b3abde6ecc322.js",
    "revision": "868c2ad4dfe021eeeac7c9512345abe8"
  },
  {
    "url": "/_nuxt/0ef150550ef51ab27e1d.js",
    "revision": "62129b67be7221928e55f87637589dea"
  },
  {
    "url": "/_nuxt/131d8991408d0e0e596f.js",
    "revision": "242c99b4530321ae05c5eac0058af989"
  },
  {
    "url": "/_nuxt/31fe2005113b600a687f.js",
    "revision": "c9a96b68d67776fec188b1428e99f081"
  },
  {
    "url": "/_nuxt/36d12ccaa255f45f0181.js",
    "revision": "8ff0683b26f82c7c587b60ea933e28f7"
  },
  {
    "url": "/_nuxt/381538555f14ca662d5e.js",
    "revision": "ad0980c8ec4a25c2280a2645c8696cde"
  },
  {
    "url": "/_nuxt/45bda3f14abd1e26e972.js",
    "revision": "ef58eba13982148933d6d63403be10c9"
  },
  {
    "url": "/_nuxt/48190c3b2fa93126350c.js",
    "revision": "e2d2fba36f13a027192f72552fc81680"
  },
  {
    "url": "/_nuxt/4845a43eb545e5f45e0b.js",
    "revision": "72cc650cc833e0902ac90a00aea3f4e8"
  },
  {
    "url": "/_nuxt/4b897ddd138ab1a061f0.js",
    "revision": "4aa9c23009a23f5eb24fd77623e3f6e7"
  },
  {
    "url": "/_nuxt/6bd8fa7de3e7b9787c75.js",
    "revision": "fcbeec3294d192ebd14d625a679df37a"
  },
  {
    "url": "/_nuxt/737e021b6cc1da041e09.js",
    "revision": "92ed08ff5dd9fc69a4156d4c5ed119a8"
  },
  {
    "url": "/_nuxt/86824e72c89442744ea8.js",
    "revision": "fb01de3ebf80dd69ac08dd0d7754bdd7"
  },
  {
    "url": "/_nuxt/996ae9c7bec641d07f11.js",
    "revision": "316bca256b7a7e8803e721e640016e1d"
  },
  {
    "url": "/_nuxt/a83433b167cb2dd0cfbc.js",
    "revision": "bab9f2c4233e7844d5888ad33f286c60"
  },
  {
    "url": "/_nuxt/c87e4366871c57b9fee1.js",
    "revision": "8e5d29d146e878604fefd3be386088f4"
  },
  {
    "url": "/_nuxt/eaf184febabbed66a267.js",
    "revision": "7214575445782641e3093606a0349fae"
  },
  {
    "url": "/_nuxt/eb17465d96b58435600f.js",
    "revision": "41afd3d6a10df10092897b30ee73e427"
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
