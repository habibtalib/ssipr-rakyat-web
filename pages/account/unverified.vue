<template>
  <div>
    <unverified-applicant-section
      :current-user="currentUser"
    ></unverified-applicant-section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UnverifiedApplicantSection from '~/components/account/unverified.vue'

export default {
  middleware: ['check_applicant_auth', 'applicant_auth'],
  layout: 'unverified',
  components: {
    UnverifiedApplicantSection
  },
  data() {
    return {
      isVerifiedApplicant: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'applicant/currentUser'
    })
  },
  fetch({ store, params }) {
    return store.dispatch('applicant/setCurrentUser')
  }
}
</script>

<style scoped>
.mt3rem {
  margin-top: 3rem;
}
.card-content.dashb {
  padding: 1rem;
}
h4.dashb {
  margin-bottom: 0;
}
</style>
