<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Pasangan</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column">
          <fieldset disabled>
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
                <tr v-for="spouse in currentUser.spouses" :key="spouse.idx">
                  <td>
                    <b-field>
                      <b-input v-model="spouse.ic"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model="spouse.name"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model="spouse.email"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model="spouse.tele_no"></b-input>
                    </b-field>
                  </td>
                  <td>
                    <b-field>
                      <b-input v-model="spouse.income"></b-input>
                    </b-field>
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  }
}
</script>
