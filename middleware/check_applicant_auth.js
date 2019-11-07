export default function(c) {
  c.store.dispatch('applicant/initAuth', c.req)
}
