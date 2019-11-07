export default function({ $axios, app, store }) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  $axios.onRequest(config => {
    if (store.getters['applicant/token']) {
      config.headers.common.Authorization =
        'Bearer ' + store.getters['applicant/token']
    }
  })
}
