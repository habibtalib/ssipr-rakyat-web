importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/2a67cb9ab695e20dc6c4.js",
    "revision": "e559d3546e9a835fedd4a02d4a50a84f"
  },
  {
    "url": "/_nuxt/3e3f58b77cadecfeac13.js",
    "revision": "11ddc8179fcdba427cdd3913d85e3059"
  },
  {
    "url": "/_nuxt/640e66696eeea160d054.js",
    "revision": "474c540feb55045384ed54e1ed11b822"
  },
  {
    "url": "/_nuxt/6dcb796c38547eb47d42.js",
    "revision": "d40345407dade7ab848c0b6e68a37a6d"
  },
  {
    "url": "/_nuxt/755119780d7526fc6eed.js",
    "revision": "7f33c7417a0e3e94edbb497aac53cfce"
  },
  {
    "url": "/_nuxt/8af29e9098b8252eb053.js",
    "revision": "88e24d74f0656a2b8da46ff406082e5c"
  },
  {
    "url": "/_nuxt/8b4b36055a8e73f7f8a7.js",
    "revision": "d678c0b2040aba921b9adb7ae3ac7e6e"
  },
  {
    "url": "/_nuxt/8bddd99c32d4b1e1912d.js",
    "revision": "8bf5d6cb1b9ed6230da4ac74aba76707"
  },
  {
    "url": "/_nuxt/9a4254df6fbd240d6b2b.js",
    "revision": "b088ceb740a1c376838d98910fc596b9"
  },
  {
    "url": "/_nuxt/ad2ade4ac632745aff55.js",
    "revision": "28287db85e58bdc7c7843abec4bcfb3a"
  },
  {
    "url": "/_nuxt/b03a3446700d38fd32c7.js",
    "revision": "0ac62a2c831d284f5b722071b11ec6ed"
  },
  {
    "url": "/_nuxt/becfc3b010dabe2484c9.js",
    "revision": "1ad1573683f3cafa5f719717396c7e22"
  },
  {
    "url": "/_nuxt/c68f6ebf66e270557a0f.js",
    "revision": "4f1a7da03347fcfd38f5a2140b422b1d"
  },
  {
    "url": "/_nuxt/cd0b8a515fa7473aaeac.js",
    "revision": "d4fe6683189b672f6212b687a270b6b8"
  },
  {
    "url": "/_nuxt/d576c4bbc34a0f4daff3.js",
    "revision": "9f3a837baf210fd9af21f7da2379fcbc"
  },
  {
    "url": "/_nuxt/d5b905917ad17e4d1e6f.js",
    "revision": "9d414cad9abf7d1c477394ebafad21fa"
  },
  {
    "url": "/_nuxt/e2cbd181f1a9d40410da.js",
    "revision": "2795555c3a2de11cb79b92df13755a21"
  },
  {
    "url": "/_nuxt/edec24f83ef645620744.js",
    "revision": "ad7d1dd68f89a8b2f02f349e320839fa"
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
