importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/04a62b189bcfeab5f406.js",
    "revision": "78fdd3990f09af23284b39e77018c086"
  },
  {
    "url": "/_nuxt/0d83cbca88bcc6a172b9.js",
    "revision": "62cbb49cc0af8fef0e3381c2d70a0918"
  },
  {
    "url": "/_nuxt/0e196218c8f47ff49290.js",
    "revision": "9b08090f50daa2daeb2819e622878d33"
  },
  {
    "url": "/_nuxt/17b62800a8e602dbe507.js",
    "revision": "1b66f1676421f4762eb7d2d4a0e94f74"
  },
  {
    "url": "/_nuxt/27ed58cf3cf85bb225a5.js",
    "revision": "7ba9cacd9c94224633ba9e6cc586dfe4"
  },
  {
    "url": "/_nuxt/3e3ab66c625c4ef2b61d.js",
    "revision": "0fd6bb8751d5bcfd29746a34ad810a32"
  },
  {
    "url": "/_nuxt/4529ada0efc6bc12b1e4.js",
    "revision": "68bd4e8708a25f9e0f276c75fdefca17"
  },
  {
    "url": "/_nuxt/496aebafc37a12401555.js",
    "revision": "ea214cb7f2e7aef170e47c32429045b4"
  },
  {
    "url": "/_nuxt/51476991ed0e6b5eab3c.js",
    "revision": "0b880fd1c6d3e9bf405f138e105c44fd"
  },
  {
    "url": "/_nuxt/5d5c5b3c7a16348dd860.js",
    "revision": "4c4a863eaa4455f8d5f199f315d93093"
  },
  {
    "url": "/_nuxt/78040e5d9047de623dfb.js",
    "revision": "e1046610e5ed242c03c28c6245a92b15"
  },
  {
    "url": "/_nuxt/7b6b5c98e17c3c357028.js",
    "revision": "0549f17be1a1887baeb556ed3cee0734"
  },
  {
    "url": "/_nuxt/8bbb986f6ea37bfa3639.js",
    "revision": "be86b808ca47a0a3763135a11adacb9c"
  },
  {
    "url": "/_nuxt/8c397780d12cd5d8414c.js",
    "revision": "4d9e19b4bac508cc70ec18efcfa526bb"
  },
  {
    "url": "/_nuxt/96c8a2459500c6b264f7.js",
    "revision": "0bf4c2a19c0a337545b03b8dc1ae2918"
  },
  {
    "url": "/_nuxt/9883aaff0e7baf853430.js",
    "revision": "9f1fe54b34ee72bf2bc8f557a66ff83b"
  },
  {
    "url": "/_nuxt/aec2d3df58abc592d0b5.js",
    "revision": "7b6442c2fee192b79fef7a4ac513d87e"
  },
  {
    "url": "/_nuxt/b07e653ab5abb218f2ce.js",
    "revision": "07a46747fc09cad8361d6ed15e89cc40"
  },
  {
    "url": "/_nuxt/d55a952ee14a097c58df.js",
    "revision": "aa0131edbc9aa354493435f6e6b8f971"
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
