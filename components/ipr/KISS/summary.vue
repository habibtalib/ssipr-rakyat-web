<template>
  <div class="columns">
    <div class="column is-full">
      <div class="columns">
        <div class="column is-full">
          <h1 class="title is-5">Rumusan Permohonan</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <h4 class="title is-6">
            Tarik Permohonan : {{ applicationDate | formatDate }}
          </h4>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="MAKLUMAT ADUN"></div>
          <div class="columns">
            <div class="column is-full">
              <b-field
                label="Pejabat Ahli Dewan Negeri atau Pejabat Penyelaras Ahli Dewan Negeri"
              >
                {{ applicant.adun }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="MAKLUMAT PEMOHON"></div>

          <div class="columns">
            <div class="column is-half">
              <b-field :label="$t('f.name')">
                {{ currentUser.name }}
              </b-field>

              <b-field label="Jantina">
                {{ currentUser.gender }}
              </b-field>

              <b-field :label="$t('f.all_id')">
                {{ currentUser.ic }}
              </b-field>

              <b-field :label="$t('f.email')">
                {{ currentUser.email }}
              </b-field>

              <b-field label="Tarikh Lahir">
                {{ currentUser.dob }}
              </b-field>

              <b-field label="Tempat Lahir">
                {{ currentUser.pob }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Warganegara">
                {{ applicant.citizen }}
              </b-field>

              <b-field label="Bangsa">
                {{ applicant.race }}
              </b-field>

              <b-field :label="$t('f.maritalStatus')">
                {{ currentUser.marital_status }}
              </b-field>

              <b-field :label="$t('f.income')">
                {{ currentUser.income }}
              </b-field>

              <b-field :label="$t('f.pNo')">
                {{ currentUser.phone_no }}
              </b-field>

              <b-field :label="$t('f.hNo')">
                {{ currentUser.home_no }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentUser.marital_status == 'Berkahwin'" class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="MAKLUMAT SUAMI"></div>

          <div
            v-for="spouse in currentUser.spouses"
            :key="spouse.idx"
            class="columns"
          >
            <div class="column is-half">
              <b-field label="Nama">
                {{ spouse.name }}
              </b-field>
              <b-field label="No. Kad Pengenalan / No. Polis / No. Tentera">
                {{ spouse.ic }}
              </b-field>
              <b-field label="Emel">
                {{ spouse.email }}
              </b-field>
              <b-field label="No Telefon Bimbit">
                {{ spouse.tele_no }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Tarikh Lahir">
                {{ applicant.spouse.dob }}
              </b-field>
              <b-field label="Negeri Kelahiran/Tempat Lahir">
                {{ applicant.spouse.pob }}
              </b-field>
              <b-field label="Tempoh Menetap di Selangor">
                {{ applicant.spouse.tempoh_tinggal }}
              </b-field>
              <b-field label="Warganegara">
                {{ applicant.spouse.citizen }}
              </b-field>
              <b-field label="Bangsa">
                {{ applicant.spouse.race }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div
            class="is-divider"
            data-content="MAKLUMAT ANAK-ANAK/TANGGUNGAN (berumur kurang daripada 21 Tahun)"
          ></div>
          <div class="columns">
            <div class="column is-full"></div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div
            class="is-divider"
            data-content="MAKLUMAT PENDAPATAN PEMOHON"
          ></div>

          <div class="columns">
            <div class="column is-half">
              <b-field label="Jenis Pekerjaan">
                {{ applicant.income.employment_type }}
              </b-field>
              <b-field label="Nama Majikan">
                {{ applicant.income.employer_name }}
              </b-field>
              <b-field label="No Telefon Majikan">
                {{ applicant.income.employer_phone }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Jumlah Pendapatan Pemohon">
                {{ currentUser.income }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div
            class="is-divider"
            data-content="MAKLUMAT PENDAPATAN SUAMI"
          ></div>

          <div class="columns">
            <div class="column is-half">
              <b-field label="Jenis Pekerjaan">
                {{ applicant.spouse.employment_type }}
              </b-field>
              <b-field label="Nama Majikan">
                {{ applicant.spouse.employer_name }}
              </b-field>
              <b-field label="No Telefon Majikan">
                {{ applicant.spouse.employer_phone }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field label="Jumlah Pendapatan Pasangan">
                {{ spouseIncome }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div
            class="is-divider"
            data-content="JUMLAH PENDAPATAN KESELURUHAN ISI RUMAH (RM)"
          ></div>

          <div class="columns">
            <div class="column is-half">
              <b-field label="Jumlah Pendapatan (RM)">
                {{ totalSalaries }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="MAKLUMAT TEMPAT TINGGAL"></div>

          <div class="columns">
            <div class="column is-full">
              <b-field :label="other_district">
                {{
                  [
                    currentUser.address_1,
                    currentUser.address_2,
                    currentUser.address_3,
                    currentUser.postcode,
                    currentUser.district == 'Lain-lain'
                      ? currentUser.other_district
                      : currentUser.district,
                    currentUser.state
                  ]
                    .filter(x => x)
                    .join(', ')
                }}
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    applicant: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    residence: {
      type: Object,
      required: true
    },
    jmbConfirmation: {
      type: Object,
      required: true
    },
    totalSpousesSalaries: {
      type: Number,
      required: true
    },
    totalSalaries: {
      type: Number,
      required: true
    },
    spouseIncome: {
      type: Number,
      required: true
    }
  },
  computed: {
    applicationDate() {
      return moment(Date.now()).format('DD/MM/YYYY')
    }
  }
}
</script>
