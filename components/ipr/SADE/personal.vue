<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Peribadi</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
          <b-field
            :label="$t('f.meterType')"
            :type="{ 'is-danger': errors.has('residenceMeterType') }"
            :message="errors.first('residenceMeterType')"
          >
            <div>
              <b-radio
                v-model="residence.meter_type"
                v-validate="'required'"
                native-value="individu"
                name="residenceMeterType"
                @input="resetValue('meter_type')"
              >
                Individu
              </b-radio>
              <b-radio
                v-model="residence.meter_type"
                v-validate="'required'"
                native-value="pukal"
                name="residenceMeterType"
                @input="resetValue('meter_type')"
              >
                Pukal
              </b-radio>
            </div>
          </b-field>
        </div>
      </div>
      <fieldset :disabled="true">
        <div class="columns">
          <div class="column is-half">
            <b-field :label="$t('f.name')">
              <b-input :value="currentUser.name"></b-input>
            </b-field>

            <b-field :label="$t('f.all_id_wo_passport')">
              <b-input :value="currentUser.ic"></b-input>
            </b-field>

            <b-field :label="$t('f.email')">
              <b-input :value="currentUser.email"></b-input>
            </b-field>
          </div>
          <div class="column is-half">
            <b-field :label="$t('f.maritalStatus')">
              <b-input :value="currentUser.marital_status"></b-input>
            </b-field>

            <b-field :label="$t('f.income')">
              <b-input v-model="currentUser.income"></b-input>
            </b-field>

            <b-field :label="$t('f.pNo')">
              <b-input :value="currentUser.phone_no"></b-input>
            </b-field>
          </div>
        </div>
      </fieldset>
      <br />
      <div class="columns">
        <div v-if="residence.meter_type == 'individu'" class="column is-half">
          <p class="help has-text-primary is-size-6">
            * 10 digit no. akaun air seperti yang tertera di dalam bil air
          </p>
          <b-field
            :type="{ 'is-danger': errors.has('residenceWaterAccNo') }"
            :message="errors.first('residenceWaterAccNo')"
          >
            <template slot="label">
              {{ $t('f.waterAccNo') }}
              <b-tooltip
                type="is-danger"
                label="028211XXXX (Baharu) 000027547XXXX (Lama)"
                multilined
              >
                <b-icon
                  type="is-danger"
                  size="is-small"
                  icon="help-circle-outline"
                ></b-icon>
              </b-tooltip>
            </template>
            <b-input
              v-model="residence.individual_meter_acc_no"
              v-validate="'required|min:10|max:10'"
              name="residenceWaterAccNo"
            ></b-input>
          </b-field>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  inject: {
    $validator: '$validator'
  },
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    residence: {
      type: Object,
      required: true
    },
    resetValue: {
      type: Function,
      required: true
    }
  }
}
</script>
