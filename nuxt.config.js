require('dotenv').config()

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'SSIPR',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  server: {
    port: process.env.PORT || 8081, // default: 3000
    host: process.env.HOST || 'localhost' // default: localhost
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/main.scss', lang: 'scss' },
    { src: '~/assets/print.css', lang: 'css' }
  ],
  /*
   ** Router
   */
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'login',
          path: '/',
          component: resolve(__dirname, 'pages/auth/index.vue')
        },
        {
          name: 'register',
          path: '/register',
          component: resolve(__dirname, 'pages/auth/register.vue')
        },
        {
          name: 'password',
          path: '/password',
          component: resolve(__dirname, 'pages/auth/forgot_pass.vue')
        },
        {
          name: 'reset_password',
          path: '/reset_password',
          component: resolve(__dirname, 'pages/auth/reset_pass.vue')
        },
        {
          name: 'request_verification',
          path: '/request_verification',
          component: resolve(__dirname, 'pages/auth/request_verification.vue')
        },
        {
          name: 'unverified',
          path: '/unverified',
          component: resolve(__dirname, 'pages/account/unverified.vue')
        }
      )
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/fa',
    '~/plugins/axios.js',
    '~/plugins/vee_val.js',
    '~/plugins/printer.js',
    '~/plugins/sentry.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // '@nuxtjs/eslint-module',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            name: 'Malay',
            code: 'my',
            iso: 'ms-my',
            file: 'my.js'
          }
        ],
        lazy: true,
        langDir: 'i18n/',
        defaultLocale: 'my'
      }
    ]
  ],
  devModules: ['@nuxtjs/eslint-module'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // proxy: true,
    // baseURL: 'https://ssipr-daftar.selangor.gov.my'
    // baseURL: 'http://localhost:4000'
    baseURL: process.env.API_URL || 'http://18.139.224.38/'
  },

  proxy: {
    // '/api/': process.env.API_URL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
