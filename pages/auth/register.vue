<template>
  <div class="column is-half is-offset-one-quarter">
    <form @submit.prevent="register()">
      <div class="is-divider" :data-content="$t('l.registerAcc')"></div>

      <b-field
        :label="$t('f.name')"
        :type="{ 'is-danger': errors.has('name') }"
        :message="errors.first('name')"
      >
        <b-input
          v-model="name"
          v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
          name="name"
        ></b-input>
      </b-field>

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

      <b-field grouped>
        <b-field
          :label="
            ic_type == 0
              ? $t('f.ic')
              : ic_type == 1
              ? $t('f.myPolisNo')
              : $t('f.myTenteraNo')
          "
          expanded
        >
          <b-field>
            <b-select v-model="ic_type" @input="resetValue('ic_type')">
              <option v-for="(type, i) in icTypes" :key="i" :value="i">{{
                type
              }}</option>
            </b-select>
            <b-field
              :type="{ 'is-danger': errors.has('applicantId') }"
              :message="errors.first('applicantId')"
              expanded
            >
              <b-input
                v-model="ic"
                v-validate="
                  ic_type == 0 ? 'required|digits:12' : 'required|alpha_num'
                "
                name="applicantId"
              ></b-input>
            </b-field>
          </b-field>
        </b-field>
      </b-field>
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
          v-model="passwordConfirmation"
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
          {{ $t('l.register') }}
        </button>
      </p>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  layout: 'auth',
  data() {
    return {
      name: null,
      ic_type: 0,
      ic: null,
      email: null,
      password: null,
      passwordConfirmation: null
    }
  },
  computed: {
    ...mapGetters({
      icTypes: 'lookup/icTypes'
    })
  },
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', [this.$t('l.login'), '/'])
  },
  methods: {
    register() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('applicant/register', {
              applicant: {
                ic: this.ic.toUpperCase(),
                email: this.email,
                name: this.name,
                ic_type: this.ic_type,
                password: this.password,
                password_confirmation: this.passwordConfirmation
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
                  message:
                    'Pendaftaran akaun telah berjaya. Sila semak e-mel anda untuk membuat pengesahan pendaftaran.',
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
