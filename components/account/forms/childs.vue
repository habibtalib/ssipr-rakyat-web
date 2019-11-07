<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Anak / Jagaan</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-full">
          <a class="button is-primary is-pulled-right" @click="addChild()"
            >Tambah</a
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-full">
          <table
            v-if="childrens.length > 0"
            class="table is-fullwidth is-bordered"
          >
            <thead>
              <tr>
                <th>{{ $t('f.all_id_wo_passport') }}</th>
                <th>{{ $t('f.name') }}</th>
                <th>{{ $t('f.dob') }}</th>
                <th>{{ $t('f.pob') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="child in childrens" :key="child.idx">
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(`${$t('f.childId')} ${child.idx}`)
                    }"
                    :message="errors.first(`${$t('f.childId')} ${child.idx}`)"
                  >
                    <b-input
                      v-model="child.ic"
                      v-validate="'required|alpha_num|max:12'"
                      :name="`${$t('f.childId')} ${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.childName')} ${child.idx}`
                      )
                    }"
                    :message="errors.first(`${$t('f.childName')} ${child.idx}`)"
                  >
                    <b-input
                      v-model="child.name"
                      v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
                      :name="`${$t('f.childName')} ${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <no-ssr>
                    <b-field
                      :type="{
                        'is-danger': errors.has(
                          `${$t('f.childDob')} ${child.idx}`
                        )
                      }"
                      :message="
                        errors.first(`${$t('f.childDob')} ${child.idx}`)
                      "
                    >
                      <b-datepicker
                        v-model="child.dob"
                        v-validate="'required'"
                        icon="calendar-today"
                        :name="`${$t('f.childDob')} ${child.idx}`"
                      ></b-datepicker>
                    </b-field>
                  </no-ssr>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.childPob')} ${child.idx}`
                      )
                    }"
                    :message="errors.first(`${$t('f.childPob')} ${child.idx}`)"
                  >
                    <b-input
                      v-model="child.pob"
                      v-validate="'required|alpha_spaces'"
                      :name="`${$t('f.childPob')} ${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td class="has-text-centered">
                  <a class="button is-warning" @click="removeChild(child)">
                    Padam
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
let idx = 1

export default {
  inject: {
    $validator: '$validator'
  },
  props: {
    childrens: {
      type: Array,
      required: true
    }
  },
  methods: {
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
    }
  }
}
</script>
