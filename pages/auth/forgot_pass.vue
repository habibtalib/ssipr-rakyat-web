<template>
  <div class="column is-half is-offset-one-quarter">
    <form @submit.prevent="claimResetPassToken()">
      <div class="is-divider" :data-content="$t('l.forgotPass')"></div>

      <b-field
        :label="$t('f.email')"
        :type="{ 'is-danger': errors.has('email') }"
        :message="errors.first('email')"
      >
        <b-input
          v-model="email"
          v-validate="'required|email'"
          name="email"
        ></b-input>
      </b-field>

      <p class="control loginbtn">
        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          {{ $t('l.submit') }}
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  layout: 'auth',
  components: {},
  data() {
    return {
      email: null
    }
  },
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', [this.$t('l.login'), '/'])
  },
  methods: {
    claimResetPassToken() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('applicant/claim_reset_pass_token', {
              email: this.email
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
                  message:
                    'Permintaan untuk membuat tetapan semula kata laluan telah berjaya disahkan. Sila semak e-mel anda untuk langkah seterusnya.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
                this.$router.push('/')
              }
            })
        }
      })
    },
    resetValue(field) {
      switch (field) {
        case 'ic_type':
          this.ic = null
          break
        default:
        // DO NOTHING
      }
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    }
  }
}
</script>
<style scoped>
.with-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/img/bgsel2.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.footpad {
  padding: 1rem;
}
.h100vh {
  height: 100vh;
}
.overflowauto {
  overflow: auto;
}
.loginbtn {
  padding: 10px 0;
}
</style>
