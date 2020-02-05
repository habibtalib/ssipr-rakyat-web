<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">
        Kasih Ibu Smart Selangor
      </h1>

      <br />

      <form @submit.prevent="finalize()">
        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat ADUN</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-4">
                <b-field
                  label="Pejabat Ahli Dewan Negeri atau Pejabat Penyelaras Ahli Dewan Negeri"
                >
                  <!-- <b-input v-model="spouse.employment_type"></b-input> -->
                  <b-select v-model="adun">
                    <option
                      v-for="(state, index) in dun"
                      :key="index"
                      :value="state"
                    >
                      {{ state }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <personal-fields
          :current-user="applicant"
          :residence="residence"
          :reset-value="resetValue"
        ></personal-fields>

        <spouses-fields
          v-if="applicant.marital_status == 'Berkahwin'"
          :current-user="applicant"
          :residence="residence"
        ></spouses-fields>

        <residence-fields
          :current-user="applicant"
          :residence="residence"
          :applicant="applicant"
        ></residence-fields>

        <article class="message is-dark">
          <div class="message-header">
            <p>MAKLUMAT PENDAPATAN PEMOHON</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jenis Pekerjaan">
                  <!-- <b-input v-model="income.employment_type"></b-input> -->
                  <b-select v-model="income.employment_type">
                    <option value="Sektor Kerajaan">Sektor Kerajaan</option>
                    <option value="Sektor Swasta">Sektor Swasta</option>
                    <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                    <option value="Pesara">Pesara</option>
                    <option value="Tidak Bekerja">Tidak Bekerja</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Nama Majikan">
                  <b-input
                    v-model="income.employer_name"
                    :disabled="
                      income.employment_type === 'Tidak Bekerja' ||
                        income.employment_type === 'Pesara' ||
                        income.employment_type === 'Bekerja Sendiri'
                    "
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="No Telefon Majikan">
                  <b-input
                    v-model="income.employer_phone"
                    :disabled="
                      income.employment_type === 'Tidak Bekerja' ||
                        income.employment_type === 'Pesara' ||
                        income.employment_type === 'Bekerja Sendiri'
                    "
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Pemohon">
                  <b-input
                    disabled
                    :value="fixedTwoDecimal(parseFloat(applicant.income))"
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <article
          v-if="applicant.marital_status == 'Berkahwin'"
          class="message is-dark"
        >
          <div class="message-header">
            <p>MAKLUMAT PENDAPATAN SUAMI</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jenis Pekerjaan">
                  <!-- <b-input v-model="spouse.employment_type"></b-input> -->
                  <b-select v-model="spouse.employment_type">
                    <option value="Sektor Kerajaan">Sektor Kerajaan</option>
                    <option value="Sektor Swasta">Sektor Swasta</option>
                    <option value="Bekerja Sendiri">Bekerja Sendiri</option>
                    <option value="Pesara">Pesara</option>
                    <option value="Tidak Bekerja">Tidak Bekerja</option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Nama Majikan">
                  <b-input
                    v-model="spouse.employer_name"
                    :disabled="
                      spouse.employment_type === 'Tidak Bekerja' ||
                        spouse.employment_type === 'Pesara' ||
                        spouse.employment_type === 'Bekerja Sendiri'
                    "
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="No Telefon Majikan">
                  <b-input
                    v-model="spouse.employer_phone"
                    :disabled="
                      spouse.employment_type === 'Tidak Bekerja' ||
                        spouse.employment_type === 'Pesara' ||
                        spouse.employment_type === 'Bekerja Sendiri'
                    "
                  ></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan">
                  <b-input v-model="spouse.income" required></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>
              MAKLUMAT ANAK-ANAK/TANGGUNGAN (berumur kurang daripada 21 Tahun)
            </p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-full">
                <a class="button is-primary is-pulled-right" @click="addChild()"
                  >Tambah</a
                >
              </div>
            </div>
            <fieldset v-if="childrens.length > 0">
              <table class="table is-fullwidth is-bordered">
                <thead>
                  <tr>
                    <th>Nama Penuh</th>
                    <th>No KP/Sijil Kelahiran</th>
                    <th>Hubungan</th>
                    <th>Umur</th>
                    <th>Pendapatan Bulanan (RM) jika ada</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(children, i) in childrens" :key="children.idx">
                    <td>
                      <b-field
                        :type="{
                          'is-danger': errors.has(`Nama Penuh ${children.idx}`)
                        }"
                        :message="errors.first(`Nama Penuh ${children.idx}`)"
                      >
                        <b-input
                          v-model="children.name"
                          v-validate="'required|alpha_num'"
                          :name="`Nama Penuh ${children.idx}`"
                        ></b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field
                        :type="{
                          'is-danger': errors.has(
                            `No KP/Sijil Kelahir ${children.idx}`
                          )
                        }"
                        :message="
                          errors.first(`No KP/Sijil Kelahir ${children.idx}`)
                        "
                      >
                        <b-input
                          v-model="children.ic"
                          v-validate="{
                            required: true
                          }"
                          :name="`No KP/Sijil Kelahir ${children.idx}`"
                        ></b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field
                        :type="{
                          'is-danger': errors.has(`Hubungan ${children.idx}`)
                        }"
                        :message="errors.first(`Hubungan ${children.idx}`)"
                      >
                        <b-input
                          v-model="children.email"
                          v-validate="{
                            required: true,
                            regex: /^[ A-Za-z@'/-]*$/
                          }"
                          :name="`Hubungan ${children.idx}`"
                        ></b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field
                        :type="{
                          'is-danger': errors.has(`Umur ${children.idx}`)
                        }"
                        :message="errors.first(`Umur ${children.idx}`)"
                      >
                        <b-input
                          v-model="children.tele_no"
                          v-validate="'numeric'"
                          :name="`Umur ${children.idx}`"
                          placeholder="18"
                        ></b-input>
                      </b-field>
                    </td>
                    <td>
                      <b-field
                        :type="{
                          'is-danger': errors.has(`Pendapatan ${children.idx}`)
                        }"
                        :message="
                          errors.first(`
                          Pendapatan ${children.idx}`)
                        "
                      >
                        <b-input
                          v-model="children.income"
                          v-validate="'required|decimal:2|min_value:0'"
                          :name="`Pendapatan ${children.idx}`"
                          step="0.01"
                          type="number"
                        ></b-input>
                      </b-field>
                    </td>
                    <td class="has-text-centered">
                      <a
                        v-if="i != 0"
                        class="button is-warning"
                        @click="removeChild(children)"
                      >
                        Padam
                      </a>
                      <a v-else class="button is-warning" disabled>
                        Padam
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="columns">
                <div class="column is-4">
                  <b-field label="Nama Penuh">
                    <b-input v-model="child.name"></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="No KP/Sijil Kelahiran">
                    <b-input v-model="child.ic"></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Hubungan">
                    <b-input v-model="child.relationship"></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Umur">
                    <b-input v-model="child.age"></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Pendapatan Bulanan (RM) jika ada">
                    <b-input v-model="child.income"></b-input>
                  </b-field>
                </div>
              </div> -->
            </fieldset>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>JUMLAH PENDAPATAN KESELURUHAN ISI RUMAH (RM)</p>
          </div>
          <div class="message-body has-background-white">
            <fieldset>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan (RM)">
                    <b-input
                      v-model="income.total_income"
                      :value="
                        fixedTwoDecimal(
                          parseFloat(applicant.income) +
                            parseFloat(spouse.income)
                        )
                      "
                      disabled
                    ></b-input>
                  </b-field>
                </div>
              </div>
            </fieldset>
          </div>
        </article>

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
                  :current-user="applicant"
                  :applicant="applicant"
                  :jmb-confirmation="jmb_confirmation"
                  :residence="residence"
                  :total-spouses-salaries="spouse.income"
                  :total-salaries="
                    fixedTwoDecimal(
                      parseFloat(applicant.income) + parseFloat(spouse.income)
                    )
                  "
                ></form-summary>

                <div class="is-divider" data-content="Perakuan Pemohon"></div>

                <article class="message is-warning">
                  <div class="message-body">
                    Sila ambil perhatian bahawa Akta Perlindungan Data Peribadi
                    2010 memberi anda hak tertentu ke atas penggunaan data
                    peribadi anda oleh pihak kami. Program Kasih Ibu Smart
                    Selangor dan SELCARE Management Sdn. Bhd. memberi keutamaan
                    dalam hal melindungi data peribadi anda dan memastikan ianya
                    terpelihara dengan mengambil langkah tertentu seperti yang
                    termaktub di dalam akta tersebut. Maklumat lanjut berkenaan
                    kenapa, apa dan bagaimana pengumpulan maklumat dan
                    penggunaannya dijelaskan didalam pernyataan privasi kami.
                    Dengan mengemukakan dan menyediakan maklumat kepada kami di
                    dalam borang pendaftaran ini, anda membenarkan penggunaan
                    maklumat peribadi yang dikumpulkan untuk memberikan
                    perkhidmatan kami, mengikut cara dan tujuan yang dinyatakan
                    dalam nota privasi kami. Sila rujuk kepada nota privasi kami
                    di laman web kiss.com.my untuk maklumat lanjut.
                  </div>
                </article>

                <div class="field">
                  <b-checkbox v-model="setuju1">Setuju</b-checkbox>
                </div>

                <article class="message is-warning">
                  <div class="message-body">
                    Saya mengaku bahawa segala maklumat di atas adalah
                    <strong>BENAR</strong> . Sekiranya didapati
                    <strong>TIDAK BENAR</strong> , Program Kasih Ibu Smart
                    Selangor berhak menarik balik bantuan yang telah diluluskan.
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
let idx = 1
export default {
  middleware: ['check_applicant_auth', 'applicant_auth'],
  components: {
    FormSummary,
    PersonalFields,
    SpousesFields,
    ResidenceFields
  },
  data() {
    return {
      setuju1: null,
      setuju2: null,
      dun: [
        'SUNGAI AIR TAWAR',
        'SABAK',
        'SUNGAI PANJANG',
        'SEKINCHAN',
        'HULU BERNAM',
        'KUALA KUBU BAHARU',
        'BATANG KALI',
        'SUNGAI BURONG',
        'PERMATANG',
        'BUKIT MELAWATI',
        'IJOK',
        'JERAM',
        'KUANG',
        'RAWANG',
        'TAMAN TEMPLER',
        'SUNGAI TUA',
        'GOMBAK SETIA',
        'HULU KELANG',
        'BUKIT ANTARABANGSA',
        'LEMBAH JAYA',
        'PANDAN INDAH',
        'TERATAI',
        'DUSUN TUA',
        'SEMENYIH',
        'KAJANG',
        'SUNGAI RAMAL',
        'BALAKONG',
        'SERI KEMBANGAN',
        'SERI SERDANG',
        'KINRARA',
        'SUBANG JAYA',
        'SERI SETIA',
        'TAMAN MEDAN',
        'BUKIT GASING',
        'KAMPUNG TUNKU',
        'BANDAR UTAMA',
        'BUKIT LANJAN',
        'PAYA JARAS',
        'KOTA DAMANSARA',
        'KOTA ANGGERIK',
        'BATU TIGA',
        'MERU',
        'SEMENTA',
        'SELAT KLANG',
        'BANDAR BARU KLANG',
        'PELABUHAN KLANG',
        'PANDAMARAN',
        'SENTOSA',
        'SUNGAI KANDIS',
        'KOTA KEMUNING',
        'SIJANGKANG',
        'BANTING',
        'MORIB',
        'TANJUNG SEPAT',
        'DENGKIL',
        'SUNGAI PELEK'
      ],
      adun: null,
      spouse: {
        employer_name: null,
        employment_type: null,
        income: null
      },
      income: {
        employer_name: null
      },
      childrens: [],
      applicant: {},
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
      currentUser: 'applicant/currentUser',
      genders: 'lookup/genders',
      religions: 'lookup/religions',
      maritalStatuses: 'lookup/maritalStatuses',
      schoolingStatuses: 'lookup/schoolingStatuses',
      districts: 'lookup/districts',
      countryStates: 'lookup/countryStates'
    })
  },
  fetch({ store, params }) {
    return store.dispatch('applicant/setCurrentUser')
  },
  created() {
    this.applicant = this.currentUser
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
    addChild() {
      const newChild = {
        idx: idx,
        ic: null,
        name: null,
        income: null,
        tele_no: null,
        email: null
      }
      this.childrens.push(newChild)
      idx++
    },
    removeChild(child) {
      this.childrens.splice(this.childrens.indexOf(child), 1)
    },
    create() {
      this.setIsLoading(true)
      this.$store
        .dispatch('ipr_application/create', {
          docket: {
            ipr_code: 'KISS',
            data: {
              childrens: this.childrens,
              spouse: this.spouse
            },
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
              if ({}.hasOwnProperty.call(res.errors, key)) {
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
