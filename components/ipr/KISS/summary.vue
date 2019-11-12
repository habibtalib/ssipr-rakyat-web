<template>
  <div class="columns">
    <div class="column is-full">
      <div class="columns">
        <div class="column is-full">
          <h1 class="title is-5">Rumusan Permohonan</h1>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Peribadi"></div>

          <div class="columns">
            <div class="column is-half">
              <b-field :label="$t('f.name')">
                {{ currentUser.name }}
              </b-field>

              <b-field :label="$t('f.all_id')">
                {{ currentUser.ic }}
              </b-field>

              <b-field :label="$t('f.email')">
                {{ currentUser.email }}
              </b-field>

              <b-field :label="$t('f.meterType')">
                {{ residence.meter_type }}
              </b-field>

              <b-field
                v-if="residence.meter_type == 'individu'"
                :label="$t('f.waterAccNo')"
              >
                {{ residence.individual_meter_acc_no }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field :label="$t('f.maritalStatus')">
                {{ currentUser.marital_status }}
              </b-field>

              <b-field :label="$t('f.income')">
                {{ currentUser.income }}
              </b-field>

              <b-field :label="$t('f.pNo')">
                {{ currentUser.phone_no }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentUser.marital_status == 'Berkahwin'" class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Pasangan"></div>

          <div class="columns">
            <div class="column is-full">
              <table class="table is-fullwidth is-bordered">
                <thead>
                  <tr>
                    <th>{{ $t('f.all_id') }}</th>
                    <th>{{ $t('f.name') }}</th>
                    <th>{{ $t('f.email') }}</th>
                    <th>{{ $t('f.pNo') }}</th>
                    <th>{{ $t('f.income') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="spouse in currentUser.spouses" :key="spouse.ic">
                    <td>
                      <b-field>
                        {{ spouse.ic }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.name }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.email }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.tele_no }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.income }}
                      </b-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Pendapatan"></div>

          <div class="columns">
            <div class="column is-full">
              <b-field label="Jenis Pendapatan">
                {{ totalSpousesSalaries }}
              </b-field>

              <b-field label="Jumlah Pendapatan Pemohon">
                {{ currentUser.income }}
              </b-field>

              <b-field label="Jumlah Pendapatan Pasangan">
                {{ totalSpousesSalaries }}
              </b-field>

              <b-field label="Jumlah Pendapatan Isi Rumah (RM)">
                {{ totalSalaries }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Tempat Tinggal"></div>

          <div class="columns">
            <div class="column is-full">
              <b-field :label="$t('f.premisOwnershipStatus')">
                {{ residence.ownership_status }}
              </b-field>

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
    }
  }
}
</script>
