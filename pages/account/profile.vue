<template>
  <div class="columns">
    <div class="column">
      <div class="columns">
        <div class="column is-full">
          <div class="level">
            <div class="level-left">
              <h1 class="has-text-weight-semibold is-size-4">
                {{ currentUser.name }}
                <span class="has-text-danger has-text-weight-light is-size-6">{{
                  currentUser.ic
                }}</span>
              </h1>
            </div>
            <div class="level-right">
              <div class="buttons">
                <b-button
                  v-if="isEditing"
                  class="button"
                  @click="cancelEditing()"
                  >Kembali</b-button
                >
                <b-button
                  v-if="!isEditing"
                  class="button is-primary"
                  @click="isEditing = !isEditing"
                  >Kemas Kini</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-full">
          <form v-if="currentUser" @submit.prevent="update()">
            <fieldset :disabled="!isEditing">
              <account-form :subject="applicant"></account-form>
            </fieldset>

            <br />

            <div class="columns">
              <div class="column">
                <b-button
                  v-if="isEditing"
                  class="button is-fullwidth"
                  @click="cancelEditing()"
                  >Kembali</b-button
                >
              </div>
              <div class="column">
                <button
                  v-if="isEditing"
                  type="submit"
                  class="button is-primary is-fullwidth"
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'buefy/dist/components/dialog'
import AccountForm from '~/components/account/form.vue'

export default {
  middleware: ['check_applicant_auth', 'applicant_auth'],
  components: {
    AccountForm
  },
  data() {
    return {
      isEditing: false,
      applicant: {
        ic: this.currentUser ? this.currentUser.ic : null,
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
  computed: {
    ...mapGetters({
      currentUser: 'applicant/currentUser'
    })
  },
  fetch({ store, params }) {
    return store.dispatch('applicant/setCurrentUser')
  },
  created() {
    this.initApplicant()
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
                  if (res.errors.hasOwnProperty.call(k)) {
                    errors.push(k + ' ' + res.errors[k].join(', '))
                  }
                }

                Dialog.alert({
                  message: errors.join(', '),
                  type: 'is-danger',
                  hasIcon: true,
                  icon: 'times-circle',
                  iconPack: 'fa'
                })
              } else {
                Dialog.alert({
                  message: 'Maklumat profil berjaya dikemaskini.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
                this.isEditing = false
                window.scrollTo(0, 0)
              }
            })
        } else {
          Dialog.alert({
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
    },
    initApplicant() {
      Object.assign(
        this.applicant,
        JSON.parse(JSON.stringify(this.currentUser))
      )
      this.applicant.dob = new Date(this.applicant.dob)

      let i
      for (i = 0; i < this.applicant.childrens.length; i++) {
        this.applicant.childrens[i].dob = new Date(
          this.applicant.childrens[i].dob
        )
      }
    },
    cancelEditing() {
      this.isEditing = false
      this.initApplicant()
    }
  }
}
</script>
