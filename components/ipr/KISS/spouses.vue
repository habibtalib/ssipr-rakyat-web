<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>MAKLUMAT SUAMI</p>
    </div>
    <div class="message-body has-background-white">
      <fieldset v-for="spouse in currentUser.spouses" :key="spouse.idx">
        <div class="columns">
          <div class="column is-half">
            <b-field label="Nama">
              <b-input :value="spouse.name" disabled></b-input>
            </b-field>
            <b-field label="No. Kad Pengenalan / No. Polis / No. Tentera">
              <b-input :value="spouse.ic" disabled></b-input>
            </b-field>
            <b-field label="Emel">
              <b-input :value="spouse.email" :disabled="spouse.email"></b-input>
            </b-field>
            <b-field label="No Telefon Bimbit">
              <b-input :value="spouse.tele_no" disabled></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field label="Tarikh Lahir">
              <b-datepicker
                v-model="applicant.spouse.dob"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="Negeri Kelahiran/Tempat Lahir">
              <b-select
                v-model="applicant.spouse.pob"
                :placeholder="$t('l.choose')"
                name="spousePOB"
              >
                <option
                  v-for="state in countryStates"
                  :key="state"
                  :value="state"
                  >{{ state }}</option
                >
              </b-select>
            </b-field>
            <b-field label="Tempoh Menetap di Selangor">
              <b-input v-model="applicant.spouse.tempoh_tinggal"></b-input>
            </b-field>
            <b-field label="Warganegara">
              <!-- <b-input v-model="spouse.citizen"></b-input> -->
              <b-select v-model="applicant.spouse.citizen">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </b-select>
            </b-field>
            <b-field label="Bangsa">
              <!-- <b-input v-model="spouse.race"></b-input> -->
              <b-select v-model="applicant.spouse.race">
                <option value="Melayu">Melayu</option>
                <option value="Cina">Cina</option>
                <option value="India">India</option>
                <option value="Others">Lain-lain</option>
              </b-select>
            </b-field>
            <b-field
              v-show="applicant.spouse.race === 'Others'"
              label="Sila nyatakan"
            >
              <b-input v-model="applicant.spouse.race"></b-input>
            </b-field>
          </div>
        </div>
      </fieldset>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    applicant: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
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
  }
}
</script>
