<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">Skim Air Darul Ehsan</h1>

      <br />

      <form @submit.prevent="finalize()">
        <personal-fields
          :current-user="currentUser"
          :residence="residence"
          :reset-value="resetValue"
        ></personal-fields>

        <spouses-fields
          v-if="currentUser.marital_status == 'Berkahwin'"
          :current-user="currentUser"
          :residence="residence"
        ></spouses-fields>

        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Pendapatan</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Pemohon">
                  <b-input disabled :value="currentUser.income"></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Pasangan">
                  <b-input
                    disabled
                    :value="
                      fixedTwoDecimal(
                        sumSpousesSalaries(currentUser.spouses, 'income')
                      )
                    "
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Isi Rumah (RM)">
                  <b-input
                    disabled
                    :value="
                      fixedTwoDecimal(
                        parseFloat(currentUser.income) +
                          sumSpousesSalaries(currentUser.spouses, 'income')
                      )
                    "
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <residence-fields
          :current-user="currentUser"
          :residence="residence"
          :applicant="applicant"
        ></residence-fields>

        <jmb-fields
          v-if="residence.meter_type == 'pukal'"
          :jmb-confirmation="jmb_confirmation"
          :residence="residence"
        ></jmb-fields>

        <hr />

        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          Hantar
        </button>

        <b-modal :active.sync="isSummaryModalActive" scroll="keep">
          <div id="printSummary" class="card">
            <div class="card-content">
              <div class="content">
                <form-summary
                  :current-user="currentUser"
                  :applicant="applicant"
                  :jmb-confirmation="jmb_confirmation"
                  :residence="residence"
                  :total-spouses-salaries="
                    fixedTwoDecimal(
                      sumSpousesSalaries(currentUser.spouses, 'income')
                    )
                  "
                  :total-salaries="
                    fixedTwoDecimal(
                      parseFloat(currentUser.income) +
                        sumSpousesSalaries(currentUser.spouses, 'income')
                    )
                  "
                ></form-summary>

                <div class="is-divider" data-content="Perakuan Pemohon"></div>

                <article class="message is-warning">
                  <div class="message-body">
                    Sila ambil perhatian bahawa Akta Perlindungan Data Peribadi
                    2010 memberi anda hak tertentu ke atas penggunaan data
                    peribadi anda oleh pihak kami. Kerajaan Negeri Selangor dan
                    Pengurusan Air Selangor Sdn. Bhd. memberi keutamaan dalam
                    hal melindungi data peribadi anda dan memastikan ianya
                    terpelihara dengan mengambil langkah tertentu seperti yang
                    termaktub di dalam akta tersebut. Dengan mengemukakan dan
                    menyediakan maklumat anda kepada kami di dalam borang
                    pendaftaran ini, anda membenarkan penggunaan maklumat
                    peribadi yang dikumpulkan untuk memberikan perkhidmatan
                    kami, mengikut cara dan tujuan yang dinyatakan dalam nota
                    privasi kami. Sila rujuk nota privasi di laman sesawang
                    <a href="https://www.airselangor.com" target="_blank"
                      >www.airselangor.com</a
                    >
                    .
                  </div>
                </article>

                <div class="field">
                  <b-checkbox v-model="setuju1">Setuju</b-checkbox>
                </div>

                <article class="message is-warning">
                  <div class="message-body">
                    Saya dengan ini mengakui bahawa segala maklumat yang
                    dinyatakan di dalam Borang Permohonan ini adalah
                    <strong>BENAR</strong> dan memberikan kebenaran kepada
                    Kerajaan Negeri Selangor dan pihak Air Selangor untuk
                    membuat semakan data butir-butir peribadi saya bagi
                    memproses permohonan ini.
                  </div>
                </article>

                <div class="field">
                  <b-checkbox v-model="setuju2">Setuju</b-checkbox>
                </div>
              </div>
            </div>
            <footer class="card-footer hide-p">
              <a
                class="card-footer-item"
                @click="isSummaryModalActive = !isSummaryModalActive"
                >Kemas Kini</a
              >
              <a class="card-footer-item" @click="print">Cetak</a>
              <a
                v-if="setuju1 && setuju2"
                class="card-footer-item"
                @click="create()"
                >Hantar</a
              >
            </footer>
          </div>
        </b-modal>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'buefy/dist/components/dialog'
import FormSummary from '~/components/ipr/KISS/summary.vue'
import PersonalFields from '~/components/ipr/KISS/personal.vue'
import SpousesFields from '~/components/ipr/KISS/spouses.vue'
import ResidenceFields from '~/components/ipr/KISS/residence.vue'
import JmbFields from '~/components/ipr/KISS/jmb.vue'

export default {
  middleware: ['check_applicant_auth', 'applicant_auth'],
  components: {
    FormSummary,
    PersonalFields,
    SpousesFields,
    ResidenceFields,
    JmbFields
  },
  data() {
    return {
      setuju1: null,
      setuju2: null,
      applicant: {
        address_1: null,
        address_2: null,
        address_3: null,
        postcode: null,
        district: null,
        state: null
      },
      residence: {
        individual_meter_acc_no: null,
        ownership_status: null,
        meter_type: null
      },
      jmb_confirmation: {
        jmb_name: null,
        jmb_email: null,
        tele_no: null
      },
      isSummaryModalActive: false
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
    this.applicant = {
      address_1: this.currentUser.address_1,
      address_2: this.currentUser.address_2,
      address_3: this.currentUser.address_3,
      postcode: this.currentUser.postcode,
      district: this.currentUser.district,
      state: this.currentUser.state
    }
  },
  methods: {
    finalize() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSummaryModalActive = true
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
    create() {
      this.setIsLoading(true)
      this.$store
        .dispatch('ipr_application/create', {
          docket: {
            ipr_code: 'KISS',
            residence: {
              meter_type: this.residence.meter_type,
              individual_meter_acc_no: this.residence.individual_meter_acc_no,
              ownership_status: this.residence.ownership_status
            },
            jmb_confirmation:
              this.residence.meter_type === 'pukal'
                ? {
                    jmb_name: this.jmb_confirmation.jmb_name,
                    jmb_email: this.jmb_confirmation.jmb_email,
                    tele_no: this.jmb_confirmation.tele_no
                  }
                : null
          }
        })
        .then(res => {
          this.setIsLoading(false)

          if (res.error) {
            const errors = []

            for (const key in res.errors) {
              if (res.errors.hasOwnProperty.call(key)) {
                for (const subKey in res.errors[key]) {
                  errors.push(
                    key +
                      ' ' +
                      subKey +
                      ' ' +
                      res.errors[key][subKey].join(', ')
                  )
                }
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
              message: this.jmb_confirmation.jmb_email
                ? 'Permohonan anda telah diterima dan sedang menunggu semakan daripada pihak JMB.'
                : 'Permohonan anda telah diterima dan sedang diproses.',
              type: 'is-success',
              hasIcon: true,
              icon: 'check-circle',
              iconPack: 'fa'
            })
            this.$router.push('/account')
          }
        })
    },
    setIsLoading(status) {
      this.$store.dispatch('loader/setIsLoading', status)
    },
    sumSpousesSalaries(items, prop) {
      const x = items.reduce((a, b) => parseFloat(a) + parseFloat(b[prop]), 0)
      return x
    },
    resetValue(field) {
      switch (field) {
        case 'meter_type':
          this.residence.individual_meter_acc_no = null
          this.residence.bulk_meter_acc_no = null
          this.jmb_confirmation.jmb_name = null
          this.jmb_confirmation.jmb_email = null
          this.jmb_confirmation.tele_no = null
          break
        default:
        // DO NOTHING
      }
    },
    fixedTwoDecimal(n) {
      return n.toFixed(2)
    },
    print() {
      const prtHtml = document.getElementById('printSummary').innerHTML
      let stylesHtml = ''

      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style')
      ]) {
        stylesHtml += node.outerHTML
      }

      const WinPrint = window.open(
        '',
        '',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
      )

      WinPrint.document.write(
        `<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
            ${prtHtml}
          </body>
        </html>`
      )

      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
      WinPrint.close()
    }
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
.mtauto {
  margin-top: auto;
}
</style>
