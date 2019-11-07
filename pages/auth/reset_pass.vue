<template>
  <div class="column is-half is-offset-one-quarter">
    <form @submit.prevent="claimResetPassToken()">
      <div class="is-divider" :data-content="$t('l.resetPass')"></div>

      <b-field
        :label="$t('f.password')"
        :type="{ 'is-danger': errors.has('password') }"
        :message="errors.first('password')"
      >
        <b-input
          ref="password"
          v-model="password"
          v-validate="'required|min:6'"
          type="password"
          password-reveal
          name="password"
        ></b-input>
      </b-field>

      <b-field
        :label="$t('f.passwordConfirm')"
        :type="{ 'is-danger': errors.has('passwordConfirmation') }"
        :message="errors.first('passwordConfirmation')"
      >
        <b-input
          v-model="password_confirmation"
          v-validate="'required|confirmed:password'"
          type="password"
          password-reveal
          name="passwordConfirmation"
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
      password: null,
      password_confirmation: null
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
            .dispatch('applicant/reset_pass', {
              token: this.$route.query.token,
              applicant: {
                password: this.password,
                password_confirmation: this.password_confirmation
              }
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
                  message: 'Kata Laluan telah berjaya dikemas kini.',
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
