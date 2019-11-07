<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>
        Maklumat Badan Pengurusan Bersama (JMB) / Perbadanan Pengurusan (MC)
      </p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
          <b-field
            :label="$t('f.jmbEmail')"
            :type="{ 'is-danger': errors.has('jmbEmail') }"
            :message="errors.first('jmbEmail')"
          >
            <b-input
              v-model="jmbConfirmation.jmb_email"
              v-validate="'required|email'"
              name="jmbEmail"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.jmbName')"
            :type="{ 'is-danger': errors.has('jmbName') }"
            :message="errors.first('jmbName')"
          >
            <b-input
              v-model="jmbConfirmation.jmb_name"
              v-validate="'required'"
              name="jmbName"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.noTeleJMB')"
            :type="{ 'is-danger': errors.has('jmbTeleNo') }"
            :message="errors.first('jmbTeleNo')"
          >
            <b-input
              v-model="jmbConfirmation.tele_no"
              v-validate="'required|numeric'"
              name="jmbTeleNo"
              placeholder="0123456789"
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
    jmbConfirmation: {
      type: Object,
      required: true
    },
    residence: {
      type: Object,
      required: true
    }
  }
}
</script>
