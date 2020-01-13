<template>
  <div>
    <article class="message is-dark">
      <div class="message-header">
        <p>Maklumat Peribadi</p>
      </div>
      <div class="message-body has-background-white">
        <div class="columns">
          <div class="column is-half">
            <b-field label="Nama">
              <b-input v-model="applicant.name"></b-input>
            </b-field>
            <b-field
              :label="$t('f.gender')"
              :type="{ 'is-danger': errors.has('applicantGender') }"
              :message="errors.first('applicantGender')"
            >
              <div>
                <b-radio
                  v-model="applicant.gender"
                  v-validate="'required'"
                  native-value="lelaki"
                  name="applicantGender"
                  >Lelaki</b-radio
                >
                <b-radio
                  v-model="applicant.gender"
                  v-validate="'required'"
                  native-value="perempuan"
                  name="applicantGender"
                  >Perempuan</b-radio
                >
              </div>
            </b-field>

            <b-field
              :label="$t('f.maritalStatus')"
              :type="{ 'is-danger': errors.has('applicantMaritalStatus') }"
              :message="errors.first('applicantMaritalStatus')"
            >
              <b-select
                v-model="applicant.marital_status"
                v-validate="'required'"
                :placeholder="$t('l.choose')"
                name="applicantMaritalStatus"
                @input="resetValue('marital_status')"
              >
                <option
                  v-for="status in maritalStatuses"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </b-select>
            </b-field>

            <b-field
              :label="$t('f.religion')"
              :type="{ 'is-danger': errors.has('applicantReligion') }"
              :message="errors.first('applicantReligion')"
            >
              <b-select
                v-model="applicant.religion"
                v-validate="'required'"
                :placeholder="$t('l.choose')"
                name="applicantReligion"
                @input="resetValue('religion')"
              >
                <option
                  v-for="religion in religions"
                  :key="religion"
                  :value="religion"
                  >{{ religion }}</option
                >
              </b-select>
            </b-field>

            <b-field v-if="applicant.religion == 'Lain-lain'">
              <b-input
                v-model="applicant.other_religion"
                placeholder="Sila Nyatakan"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.schoolStatus')"
              :type="{ 'is-danger': errors.has('applicantSchoolStatus') }"
              :message="errors.first('applicantSchoolStatus')"
            >
              <b-select
                v-model="applicant.education_level"
                v-validate="'required'"
                :placeholder="$t('l.choose')"
                name="applicantSchoolStatus"
                @input="resetValue('education_level')"
              >
                <option
                  v-for="status in schoolingStatuses"
                  :key="status"
                  :value="status"
                  >{{ status }}</option
                >
              </b-select>
            </b-field>

            <b-field v-if="applicant.education_level == 'Lain-lain'">
              <b-input
                v-model="applicant.other_education_level"
                placeholder="Sila Nyatakan"
              ></b-input>
            </b-field>

            <no-ssr>
              <b-field
                :label="$t('f.dob')"
                :type="{ 'is-danger': errors.has('applicantDob') }"
                :message="errors.first('applicantDob')"
              >
                <b-datepicker
                  v-model="applicant.dob"
                  v-validate="'required'"
                  :date-formatter="dobFormatter"
                  icon="calendar-today"
                  name="applicantDob"
                ></b-datepicker>
              </b-field>
            </no-ssr>

            <b-field
              :label="$t('f.pob')"
              :type="{ 'is-danger': errors.has('applicantPob') }"
              :message="errors.first('applicantPob')"
            >
              <b-input
                v-model="applicant.pob"
                v-validate="'required'"
                name="applicantPob"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field
              :label="$t('f.residencePeriod')"
              :type="{
                'is-danger': errors.has('applicantResidencePeriod')
              }"
              :message="errors.first('applicantResidencePeriod')"
            >
              <b-input
                v-model="applicant.residence_period"
                v-validate="'required|min_value:0'"
                name="applicantResidencePeriod"
                type="number"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.income')"
              :type="{
                'is-danger': errors.has('applicantIncome')
              }"
              :message="errors.first('applicantIncome')"
            >
              <b-input
                v-model="applicant.income"
                v-validate="'required|decimal:2|min_value:0'"
                name="applicantIncome"
                step="0.01"
                type="number"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.pNo')"
              :type="{ 'is-danger': errors.has('applicantPNo') }"
              :message="errors.first('applicantPNo')"
            >
              <b-input
                v-model="applicant.phone_no"
                v-validate="'required|numeric'"
                name="applicantPNo"
                placeholder="0123456789"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.hNo')"
              :type="{ 'is-danger': errors.has('applicantHNo') }"
              :message="errors.first('applicantHNo')"
            >
              <b-input
                v-model="applicant.home_no"
                v-validate="'numeric'"
                name="applicantHNo"
                placeholder="032345678"
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </article>

    <article class="message is-dark">
      <div class="message-header">
        <p>Maklumat Tempat Tinggal</p>
      </div>
      <div class="message-body has-background-white">
        <div class="columns">
          <div class="column is-half">
            <b-field
              :label="$t('f.address')"
              :type="{ 'is-danger': errors.has('applicantAddress1') }"
              :message="errors.first('applicantAddress1')"
            >
              <b-input
                v-model="applicant.address_1"
                v-validate="'required|max:50'"
                name="applicantAddress1"
              ></b-input>
            </b-field>

            <b-field
              :type="{ 'is-danger': errors.has('applicantAddress2') }"
              :message="errors.first('applicantAddress2')"
            >
              <b-input
                v-model="applicant.address_2"
                v-validate="'max:50'"
                name="applicantAddress2"
              ></b-input>
            </b-field>

            <b-field
              :type="{ 'is-danger': errors.has('applicantAddress3') }"
              :message="errors.first('applicantAddress3')"
            >
              <b-input
                v-model="applicant.address_3"
                v-validate="'max:50'"
                name="applicantAddress3"
                max="10"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field
              :label="$t('f.postCode')"
              :type="{ 'is-danger': errors.has('applicantPostcode') }"
              :message="errors.first('applicantPostcode')"
            >
              <b-input
                v-model="applicant.postcode"
                v-validate="'required|numeric|max:5'"
                name="applicantPostcode"
                max="10"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.district')"
              :type="{ 'is-danger': errors.has('applicantDistrict') }"
              :message="errors.first('applicantDistrict')"
            >
              <b-select
                v-model="applicant.district"
                v-validate="'required'"
                :placeholder="$t('l.choose')"
                name="applicantDistrict"
                @input="resetValue('district')"
              >
                <option
                  v-for="district in districts"
                  :key="district"
                  :value="district"
                  >{{ district }}</option
                >
              </b-select>
            </b-field>

            <b-field v-if="applicant.district == 'Lain-lain'">
              <b-input
                v-model="applicant.other_district"
                placeholder="Sila Nyatakan"
              ></b-input>
            </b-field>

            <b-field
              :label="$t('f.state')"
              :type="{ 'is-danger': errors.has('applicantState') }"
              :message="errors.first('applicantState')"
            >
              <b-select
                v-model="applicant.state"
                v-validate="'required'"
                :placeholder="$t('l.choose')"
                name="applicantState"
              >
                <option
                  v-for="state in countryStates"
                  :key="state"
                  :value="state"
                  >{{ state }}</option
                >
              </b-select>
            </b-field>
          </div>
        </div>
      </div>
    </article>

    <spouses-fields
      v-if="applicant.marital_status == 'Berkahwin'"
      :spouses="applicant.spouses"
    >
    </spouses-fields>

    <childrens-fields
      v-if="applicant.marital_status && applicant.marital_status != 'Bujang'"
      :childrens="applicant.childrens"
    ></childrens-fields>
  </div>
</template>

<script>
// import moment from 'moment'
import { mapGetters } from 'vuex'
import SpousesFields from '~/components/account/forms/spouses.vue'
import ChildrensFields from '~/components/account/forms/childs.vue'

export default {
  inject: {
    $validator: '$validator'
  },
  components: {
    SpousesFields,
    ChildrensFields
  },
  props: {
    subject: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      applicant: this.subject
    }
  },
  computed: {
    ...mapGetters({
      genders: 'lookup/genders',
      religions: 'lookup/religions',
      maritalStatuses: 'lookup/maritalStatuses',
      schoolingStatuses: 'lookup/schoolingStatuses',
      districts: 'lookup/districts',
      countryStates: 'lookup/countryStates'
    })
  },
  methods: {
    formatDate(date) {
      const d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      const year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [day, month, year].join('/')
    },
    dobFormatter(dt) {
      return this.formatDate(dt)
    },
    resetValue(field) {
      switch (field) {
        case 'marital_status':
          if (this.applicant.marital_status === 'Berkahwin') {
            this.applicant.spouses = [
              {
                idx: 1,
                ic: null,
                name: null,
                income: null,
                tele_no: null,
                email: null
              }
            ]
            this.applicant.childrens = []
          } else {
            this.applicant.spouses = []
            this.applicant.childrens = []
          }
          break
        case 'religion':
          this.applicant.other_religion = null
          break
        case 'district':
          this.applicant.other_district = null
          break
        case 'education_level':
          this.applicant.other_education_level = null
          break
        default:
        // DO NOTHING
      }
    }
  }
}
</script>
