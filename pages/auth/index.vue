<template>
  <div class="column is-half is-offset-one-quarter">
    <form>
      <div class="is-divider" :data-content="$t('l.login')"></div>

      <b-field :label="$t('f.all_id_wo_passport')">
        <b-input v-model="ic"></b-input>
      </b-field>

      <b-field :label="$t('f.password')">
        <b-input v-model="password" type="password"></b-input>
      </b-field>

      <p class="control loginbtn">
        <b-button type="is-primary is-fullwidth" outlined @click="login()">{{
          $t('l.login')
        }}</b-button>
      </p>
      <p class="has-text-centered">
        <nuxt-link class="button is-text is-small" to="password">{{
          $t('l.forgotPass')
        }}</nuxt-link>
        <nuxt-link class="button is-text is-small" to="request_verification">{{
          $t('l.requestVerification')
        }}</nuxt-link>
      </p>
      <div class="is-divider" :data-content="$t('l.or')"></div>
      <p>
        <nuxt-link class="button is-fullwidth is-outlined" to="register">{{
          $t('l.registerAcc')
        }}</nuxt-link>
      </p>
    </form>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  layout: 'auth',
  data() {
    return {
      ic: null,
      password: null
    }
  },
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', [
      this.$t('l.registerAcc'),
      'register'
    ])
  },
  methods: {
    login() {
      this.setIsLoading(true)
      this.$store
        .dispatch('applicant/login', {
          ic: this.ic.toUpperCase(),
          password: this.password
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

            Dialog.alert({
              message: errors.join(', '),
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          } else {
            this.$router.push('/account')
          }
        })
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
    url('~assets/img/bgsel.png');
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
