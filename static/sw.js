importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/4d64f9fe8b8031fc0aa7.js",
    "revision": "4cd52226ac89292b92187c8116e17fdf"
  },
  {
    "url": "/_nuxt/5a3241c60e912d204203.js",
    "revision": "aa916b160919b64544795c098a422e85"
  },
  {
    "url": "/_nuxt/8e01b4a31bdc64f05df1.js",
    "revision": "da9124027c631e746ea389603a6dd566"
  },
  {
    "url": "/_nuxt/94f3cf474262e8edcd54.js",
    "revision": "092a0f05f62b9fad8da0982f411ade9e"
  },
  {
    "url": "/_nuxt/97bfed4b34d1ae6fc112.js",
    "revision": "e10981061d6c39bc056996b89d37dbba"
  },
  {
    "url": "/_nuxt/a136bad7cb1b72993b47.js",
    "revision": "212822376301547265b1d18cb521364e"
  },
  {
    "url": "/_nuxt/a6d05f5e942d72548ee6.js",
    "revision": "6b2ac697bdb252046014f7d4978b69db"
  },
  {
    "url": "/_nuxt/a9ed3967224eeba8e0fe.js",
    "revision": "569fdb0dffae18a6785f231a8e471ace"
  },
  {
    "url": "/_nuxt/bf1c8aaf0c52fa028273.js",
    "revision": "3a4dbd0e32440388270c69b571882e7b"
  },
  {
    "url": "/_nuxt/c2590994de6456d42f88.js",
    "revision": "aad723064829d714a40901b621afe6cd"
  },
  {
    "url": "/_nuxt/c5b0d2e4edd7f6df11ec.js",
    "revision": "40881362ac144adf5869c33b60e811e6"
  },
  {
    "url": "/_nuxt/cff4be46ad3e339d80ac.js",
    "revision": "33f3575e04c8dda4d97313bc313b986b"
  },
  {
    "url": "/_nuxt/d708588bd61328f46c46.js",
    "revision": "757606dbd6f8395cb337db8ca4a6bf53"
  },
  {
    "url": "/_nuxt/ddb28620907a604aa631.js",
    "revision": "18ce661ee66c4793c95779a42ad2571f"
  },
  {
    "url": "/_nuxt/fb6e936e40da3af853b1.js",
    "revision": "8db5a863b9b2a4e1e5eca2e22c765b35"
  },
  {
    "url": "/_nuxt/fd0fae8c78361da4acc8.js",
    "revision": "c734d4d8dc96af5e99b7581562afa74b"
  },
  {
    "url": "/_nuxt/fe85a8a7172f24752eee.js",
    "revision": "b6f6e4eb0d37f0b3e7db7c3a43a42c95"
  },
  {
    "url": "/_nuxt/ff186bcb704e38527f96.js",
    "revision": "d04a7383a373360fb21c75404c96d4a1"
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
