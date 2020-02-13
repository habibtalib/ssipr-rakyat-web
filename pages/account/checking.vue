<template>
  <div class="column is-half is-offset-one-quarter">
    <form>
      <div class="is-divider" data-content="Semak Permohonan"></div>

      <b-field :label="$t('f.all_id_wo_passport')">
        <b-input v-model="ic"></b-input>
      </b-field>

      <p class="control loginbtn">
        <b-button type="is-primary is-fullwidth" outlined @click="check()"
          >Semak
        </b-button>
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
    check() {
      this.setIsLoading(true)
      this.setIsLoading(false)
      Dialog.alert({
        message: 'Maaf, Maklumat anda tiadak dalam Rekod Kami',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa'
      })
      this.setIsLoading(false)
    },
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
