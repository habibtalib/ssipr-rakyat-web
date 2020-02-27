<template>
  <div class="column is-half is-offset-one-quarter">
    <form @submit.prevent="check()">
      <div class="is-divider" data-content="Semak Permohonan"></div>

      <b-field :label="$t('f.all_id_wo_passport')">
        <b-input v-model="ic" required></b-input>
      </b-field>

      <p class="control loginbtn">
        <b-button native-type="submit" type="is-primary is-fullwidth" outlined
          >Semak
        </b-button>
      </p>
    </form>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'
import axios from 'axios'
export default {
  layout: 'auth',
  data() {
    return {
      ic: null,
      tawas: null,
      emas: null,
      skw: null,
      isCardModalActive: true,
      result: false
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
      this.$store
        .dispatch('ipr_application/checkTawas', this.ic)
        .then(res => {
          this.setIsLoading(false)
          if (res.status === 200 && res.data && res.data.tarikhmohon) {
            this.tawas = res.data
            Dialog.alert({
              message: `Status permohonan TAWAS: ${this.tawas.status_proses}`,
              type: 'is-info',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          } else {
            Dialog.alert({
              message: 'Maaf, Maklumat anda tiadak dalam Rekod Kami',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      // this.setIsLoading(false)
    },
    checkTawas() {
      axios
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/pawas/${this.ic}`
        )
        .then(res => {
          if (res.status === 200) {
            this.tawas = res.data
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })

      return false
    },
    checkSkw() {
      axios
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/skw/${this.ic}`
        )
        .then(res => {
          if (res.status === 200) {
            this.skw = res.data
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
    },
    checkEmas() {
      axios
        .get(
          `http://ssipr-yawas-api-dev.ap-southeast-1.elasticbeanstalk.com/emas/${this.ic}`
        )
        .then(res => {
          if (res.status === 200) {
            this.emas = res.data
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
      return false
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
