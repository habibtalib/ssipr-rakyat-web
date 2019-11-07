export default function({ store, redirect }) {
  if (!store.getters['applicant/token']) {
    redirect('/')
  }
}
