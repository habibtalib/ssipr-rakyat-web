<template>
  <div class="columns">
    <div class="column">
      <article class="message is-info">
        <div class="message-header">
          <p>Info</p>
        </div>
        <div class="message-body">
          Sila lengkapkan profil anda untuk proses tapisan kelayakan sebelum
          anda layak memohon sebarang program IPR ditawarkan.
        </div>
      </article>

      <form @submit.prevent="update()">
        <account-form :subject="applicant"></account-form>
        <article class="message is-dark">
          <div class="message-header">
            <p>Pengesahan</p>
          </div>
          <div class="message-body has-background-white">
            <article class="message is-warning">
              <div class="message-body">
                Saya dengan ini bersetuju dengan terma dan syarat yang telah
                ditetapkan dan segala maklumat peribadi yang diberikan adalah
                benar, tepat, dan terkini.
              </div>
            </article>

            <div class="field">
              <b-checkbox v-model="applicant.profile_completed"
                >Setuju</b-checkbox
              >

              <hr />

              <button
                type="submit"
                class="button is-primary is-fullwidth is-outlined"
                :disabled="!applicant.profile_completed"
              >
                Daftar
              </button>
            </div>
          </div>
        </article>
      </form>
    </div>
  </div>
</template>

<script>
import AccountForm from '~/components/account/form.vue'

export default {
  components: {
    AccountForm
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      applicant: {
        ic: this.currentUser.ic,
        gender: null,
        marital_status: null,
        dob: null,
        pob: null,
        income: null,
        residence_period: null,
        religion: null,
        other_religion: null,
        phone_no: null,
        home_no: null,
        address_1: null,
        address_2: null,
        address_3: null,
        postcode: null,
        district: null,
        other_district: null,
        education_level: null,
        other_education_level: null,
        no_of_child: null,
        state: null,
        profile_completed: null,
        childrens: [],
        spouses: []
      }
    }
  },
  methods: {
    update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('applicant/update', {
              applicant: this.applicant
            })
            .then(res => {
              this.setIsLoading(false)

              if (res.error) {
                const errors = []

                for (const k in res.errors) {
                  if ({}.hasOwnProperty.call(res.errors, k)) {
                    errors.push(k + ' ' + res.errors[k].join(', '))
                  }
                }

                this.$buefy.dialog.alert({
                  message: errors.join(', '),
                  type: 'is-danger',
                  hasIcon: true,
                  icon: 'times-circle',
                  iconPack: 'fa'
                })
              } else {
                this.$buefy.dialog.alert({
                  message: 'Maklumat profil berjaya dihantar untuk disemak.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
                this.$router.push('/account')
              }
            })
        } else {
          this.$buefy.dialog.alert({
            message: 'Maklumat tidak lengkap. Sila semak.',
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          })
        }
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    }
  }
}
</script>
